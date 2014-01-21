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
	}
});