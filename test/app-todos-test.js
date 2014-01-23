var should = chai.should();

describe('Application', function() {
    it('creates a global variable for the namespace', function() {
        should.exist(todoApp);
    });

    it('create a global variable for Models', function() {
        should.exist(todoApp.Models);
    });

    it('create a global variable for Views', function() {
        should.exist(todoApp.Views);
    });

    it('create a global variable for Collections', function() {
        should.exist(todoApp.Collections);
    });
});

describe('Todo Model', function() {
    describe('Initialization', function() {
        beforeEach(function() {
            this.todo = new todoApp.Models.Todo();
        });

        it('default status should be pending', function() {
            this.todo.get('complete').should.be.false;
        });

        it('default title should be empty', function() {
            this.todo.get('title').should.equal('');
        });
    });
});

describe('Persistence', function() {
    beforeEach(function() {
        this.todo = new todoApp.Models.Todo();
        this.save_stub = sinon.stub(this.todo, "save");
    });

    afterEach(function() {
        this.save_stub.restore();
    });

    it('should update server when title is changed', function() {
        this.todo.set('title', 'new title');
        this.save_stub.should.have.been.calledOnce;
    });

    it('should update server when status is changed', function() {
        this.todo.set('complete', true);
        this.save_stub.should.have.been.calledOnce;
    });
});

describe('Todo item view', function() {
    beforeEach(function() {
        this.todo = new todoApp.Models.Todo({title: 'new title'});
        this.item = new todoApp.Views.TodoItem({model: this.todo});
        this.save_stub = sinon.stub(this.todo, 'save');
    });

    afterEach(function() {
        this.save_stub.restore();
    });

    it('render() should return the view object', function() {
        this.item.render().should.equal(this.item);
    });

    it('should render <li> tag', function() {
        this.item.render().el.nodeName.should.equal('LI');
    });

    describe('Template', function() {
        beforeEach(function() {
            this.item.render();
        });

        it('should contain the todo title as a text', function() {
            this.item.$el.text().should.have.string('new title');
        });

        it('should include a label', function() {
            this.item.$el.find('label').should.have.length(1);
        });

        it('should include a checkbox', function() {
            this.item.$el.find("label>input[type='checkbox']").should.have.length(1);
        });

        it('checkbox should be clear as default', function() {
            this.item.$el.find("label>input[type='checkbox']").is(':checked').should.be.false;
        });

        it('checkbox should be set for "complete" todos', function() {    
            this.todo.set('complete', true);
            this.item.render();
            this.item.$el.find("label>input[type='checkbox']").is(":checked").should.be.true;
        });
    });

    describe('Model Interaction', function() {
        it('should update model when the chackbox is clicked', function() {
            $('<div>').attr('id', 'fixture').css('display', 'none').appendTo('body');
            this.item.render();
            $('#fixture').append(this.item.$el);
            this.item.$el.find('input').click();
            this.todo.get('complete').should.be.true;
            $('#fixture').remove();
        });
    });
});

describe('Todo List View', function() {
    beforeEach(function() {
        this.todos = new todoApp.Collections.Todos([
            {title: 'title 1'},
            {title: 'title 2'}
        ]);

        this.list = new todoApp.Views.TodoList({collection: this.todos});
    });

    it('render() should return the view object', function() {
        this.list.render().should.equal(this.list);
    });

    it('should render <ul> tag', function() {
        this.list.render().el.nodeName.should.equal('UL');
    });

    it('should include list items for all models in collection', function() {
        this.list.render();
        this.list.$el.find('li').should.have.length(2);
    });

});