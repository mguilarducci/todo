if (typeof todoApp == "undefined")
	todoApp = {
		Models: {},
		Views: {},
		Collections: {}
	};

todoApp.Models.Todo = Backbone.Model.extend({
	defaults: {
		title: "",
		complete: false
	},

	initialize: function() {
		this.on('change', function() {
			this.save();
		});
	},

	toggleStatus: function() {
		this.set('complete', !this.get('complete'));
	}
});

todoApp.Views.TodoItem = Backbone.View.extend({
	tagName: 'li',
	template: _.template(
		"<label>" +
			"<input type='checkbox' <% if (complete) print('checked') %> />" +
			"<%= title %>" +
		"</label>"
	),

	events: {
		'click input': 'toggleStatus'
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	toggleStatus: function() {
		this.model.toggleStatus();
	}
});