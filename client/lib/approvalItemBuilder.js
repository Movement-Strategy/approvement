approvalItemBuilder = {
	onApprovalItemsReady : function()  {
		calendarBuilder.handleCalendarDays();
	},
	getApprovalItemsByDay : function() {
		var itemsByDay = {};
		if(Session.get('clients_are_ready')) {
			var query = this.getFindQuery();
			var items = ApprovalItem.find(query).fetch();
			_.map(items, function(item){
 				var scheduledDate = moment(item.scheduled_time).add(4, 'hours');
				var dayIndex = scheduledDate.isoWeekday();
				if(!_.has(itemsByDay, dayIndex)) {
					itemsByDay[dayIndex] = [];
				}
				if(approvalItemBuilder.isLinkTypeWithoutDataPopulated(item)) {
					approvalItemBuilder.fillInMissingDataForFacebookLink(item);
				} else {
					itemsByDay[dayIndex].push(item);
				}
			});
		}
		
		if(Session.get('cached_day_index') == null) {
			Session.set('cached_approval_items', itemsByDay);
		}
		
		return itemsByDay;
	},
	fillInMissingDataForFacebookLink : function(item) {
			var linkURL = item['contents']['facebook_link'];
			Meteor.call('getLinkResponse', linkURL, function(error, response){
				if(error == null) {
					var linkData = facebookHandler.convertResponseIntoLinkData(response);
					approvalItemBuilder.updateApprovalItemWithLinkData(item, linkData);
				} else {
					
					Meteor.call('handleInvalidLink', item['_id']);
				}
			});
	},
	updateApprovalItemWithLinkData : function(item, linkData) {
			var updatedContents = item['contents'];	
			var inputsToUpdate = {
				link_text : inputBuilder.inputMap['facebook']['input_types']['link_text'],
				link_body : inputBuilder.inputMap['facebook']['input_types']['link_body'],
			};
			
			_.map(inputsToUpdate, function(input, inputName){
				input = inputBuilder.updateInputFromLinkData(input, linkData);
				updatedContents[inputName] = input['text'];
			});
			
			var imageURL = imageUploadHandler.getImageURLFromLinkData(linkData);
			if(imageURL != null) {
				updatedContents['image_url'] = imageURL;
			}
			Meteor.call('updateStatus', item['_id'], {contents : updatedContents});
	},
	isLinkTypeWithoutDataPopulated : function(item) {
		
		if(_.has(item, 'contents')) {
			var contents = item['contents'];
			var hasLink = _.has(contents, 'facebook_link');
			var bodyMissing = !_.has(contents, 'link_body');
			var titleMissing = !_.has(contents, 'link_text');
		}
		
		return  bodyMissing && titleMissing && hasLink;
	},
	editItem : function(itemID, clientID, weekID) {
		Router.go('/client/' + clientID + '/week/' + weekID + '/content/edit/' + itemID);
	},
	onEditApprovalItem : function(context) {
		var creatingNew = false;
		Session.set('approval_item_context', context);
		this.editItem(context._id, Session.get('selected_client_id'), timeHandler.getWeekForSelectedTime());
	},
	draggedItemShouldRevert : function(droppedOn) {
		shouldRevert = true;
		if(droppedOn && !calendarBuilder.plusIsDraggedOver()) {
			var targetDay = UI.getData(droppedOn[0]);
			if(targetDay && targetDay.day.index != Session.get('dragged_item').day.index) {
				shouldRevert = false;
			}
		}
		return shouldRevert;	
	},
	iconMap : {
		facebook : 'facebook',
		twitter : 'twitter',
		instagram : 'instagram',
		linked : 'linkedin',
	},
	onDragStart : function(event) {
		var approvalItem = UI.getData(event.target);
		Session.set('dragged_item', approvalItem);
		detailsHandler.closeShownPopup();
		popupContent.disablePopups();
	},
	onDragStop : function(event) {
		if(Session.get('is_dragged_outside_of_calendar')) {
			Session.set('is_dragged_outside_of_calendar', false);
			Session.set('current_item_id', Session.get('dragged_item')._id);
			promptModalHandler.show('approval_item');
		}
		
		Session.set('popups_disabled', false);
		calendarBuilder.stopChangingDates();
		Meteor.defer(function(){
			Session.set('dragged_over_day', null);
			
		});
	},
	onDragEnd : function() {
		Session.set('dragged_item', null);
		calendarBuilder.resetDraggedOverDay();	
	},
	getFindQuery : function() {
		var startTime = timeHandler.getTimestampForCurrentDate();
		var startOfWeek = moment(startTime);
		var endDate = startOfWeek;
		endDate.add(7, 'days');
		var endTime = endDate.format('X') * 1000;
		return {
			scheduled_time : {
				$gte : startTime,
				$lt : endTime,
			},
			client_id : Session.get('selected_client_id'),
		};
	},
	addItemsToCalendarDay : function(day, dayIndex, itemsByDay) {
		if(_.has(itemsByDay, dayIndex)) {
			day['approval_items'] = {};	
			_.map(itemsByDay[dayIndex], function(item) {
				day = approvalItemBuilder.addItemToDay(day, item);
			});
		}
		return day;
	},
	addItemToDay : function(day, item) {
		var scope = item.scope;
		if(!_.has(day['approval_items'],scope)) {
			day['approval_items'][scope] = [];
		}
		var processedItem = {};
		
		processedItem = item;
		// convert the status to a label color
		processedItem['label_color'] = statusColorMap[item.status];
		
		processedItem['label_icon'] = this.getIconForType(item.type);
		
		// add this back in so we can process this data structure the same depending on if its being editted or created new
		processedItem['day'] = {
			scheduled_time : day.scheduled_time,
			is_today : day.is_today,
			index : day.index,
		};
		day['approval_items'][scope].push(processedItem);
		
		return day;
	},
	getIconForType : function(networkType) {
		return this.iconMap[networkType];
	}
};