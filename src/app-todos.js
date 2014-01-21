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
	}
});