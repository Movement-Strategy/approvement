approvalItemBuilder = {
	onApprovalItemsReady : function()  {
		 
	},
	getApprovalItemsByDay : function() {
		var itemsByDay = {};
		if(Session.get('clients_are_ready')) {
			var query = this.getFindQuery();
			var items = ApprovalItem.find(query).fetch();
			_.map(items, function(item){
				var scheduledDate = moment(item.scheduled_time);
				var dayIndex = scheduledDate.isoWeekday();
				if(!_.has(itemsByDay, dayIndex)) {
					itemsByDay[dayIndex] = [];
				}
				itemsByDay[dayIndex].push(item);
			});
		}
		
		Session.set('cached_approval_items', itemsByDay);
		
		return itemsByDay;
	},
	iconMap : {
		facebook : 'facebook',
		twitter : 'twitter',
		instagram : 'instagram',
		linked : 'linkedin',
	},
	onDragStart : function(event) {
		var approvalItem = UI.getElementData(event.target);
		
		var elementID = 'label_' + approvalItem._id;
		$('#' . elementID).popup('destroy');
		Session.set('use_cached_approval_items', true);
		Session.set('dragged_item', approvalItem);
		detailsHandler.closeShownPopup();
		popupContent.disablePopups();
	},
	onDragEnd : function() {
		Session.set('dragged_item', null);
		calendarBuilder.resetDraggedOverDay();	
	},
	getFindQuery : function() {
		
		var startOfWeek = timeHandler.getStartOfWeek();
		var startTime = startOfWeek.format('X') * 1000;
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