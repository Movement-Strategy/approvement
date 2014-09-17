approvalItemBuilder = {
	setItemsByDay : function() {
		var query = this.getFindQuery();
		var items = ApprovalItem.find(query).fetch();
		var itemsByDay = {};
		_.map(items, function(item){
			var scheduledDate = moment(item.scheduled_time);
			var dayIndex = scheduledDate.isoWeekday();
			if(!_.has(itemsByDay, dayIndex)) {
				itemsByDay[dayIndex] = [];
			}
			itemsByDay[dayIndex].push(item);
		});
		Session.set('approval_items_by_day', itemsByDay);
	},
	iconMap : {
		facebook : 'facebook',
		twitter : 'twitter',
		instagram : 'instagram',
		linked : 'linkedin',
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
			scheduled_time : day.scheduled_time
		};
		day['approval_items'][scope].push(processedItem);
		
		return day;
	},
	getIconForType : function(networkType) {
		return this.iconMap[networkType];
	}
};