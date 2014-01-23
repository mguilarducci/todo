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

todoApp.Views.TodoList = Backbone.View.extend({
	tagName: 'ul',
	initialize: function() {
		this.collection.on('add', this.add, this);
	},

	render: function() {
		this.addAll();
		return this;
	},

	addAll: function() {
		this.collection.each(this.add, this);
	},
	add: function(todo) {
		var item = new todoApp.Views.TodoItem({model: todo});
		this.$el.append(item.render().el);
	}
});

todoApp.Collections.Todos = Backbone.Collection.extend({
	model: todoApp.Models.Todo,
	url: 'api/todos'
});