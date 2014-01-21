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

