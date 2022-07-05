const { expect } = require('chai');
const sinon = require('sinon');
const taskController = require('../../../controller/taskController');
const taskService = require('../../../service/taskService');

describe('Testing task controller', () => {
  const errorMock = { message: "Error test"}
  const errorMessage = { message: "Internal server error!" };

  describe('Create task', () => {
    const mockNewTask = {
      task: "Nova task",
      status: "to do",
      priority: "high"
    };
    const response = {};
    const request = { body: mockNewTask };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      sinon.stub(taskService, 'create').rejects(errorMock);
    });

    after(() => {
      taskService.create.restore();
    });

    it('Fail Create', async () => {
      await taskController.create(request, response);

      expect(response.status.calledWith(500)).true;
      expect(response.json.calledWith(errorMessage)).true;
    });
  });

  describe('Create task', () => {
    const mockNewTask = {
      task: "Nova task",
      status: "to do",
      priority: "high"
    };
    const mockNewTaskCreated = {
      id: 1,
      task: "Nova task",
      status: "to do",
      priority: "high",
      updatedAt: "2022-07-05T03:40:49.235Z",
      createdAt: "2022-07-05T03:40:49.235Z"
    };
    const response = {};
    const request = { body: mockNewTask };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      sinon.stub(taskService, 'create').resolves(mockNewTaskCreated);
    });

    after(() => {
      taskService.create.restore();
    });

    it('Sucsses Created', async () => {
      await taskController.create(request, response);

      expect(response.status.calledWith(201)).true;
      expect(response.json.calledWith(mockNewTaskCreated)).true;
    });
  });

  describe('Update task', () => {
    const mockUpdateTask = {
      id: 1,
      task: "Nova task",
      status: "to do",
      priority: "high"
    };
    const response = {};
    const request = { body: mockUpdateTask };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      sinon.stub(taskService, 'update').rejects(errorMock);
    });

    after(() => {
      taskService.update.restore();
    });

    it('Fail Update', async () => {
      await taskController.update(request, response);

      expect(response.status.calledWith(500)).true;
      expect(response.json.calledWith(errorMessage)).true;
    });
  });

  describe('Update task', () => {
    const mockUpdateTask = {
      id: 1,
      task: "Nova task",
      status: "to do",
      priority: "high"
    };
    const response = {};
    const request = { body: mockUpdateTask };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      sinon.stub(taskService, 'update').resolves([1]);
    });

    after(() => {
      taskService.update.restore();
    });

    it('Sucsses Updated', async () => {
      await taskController.update(request, response);

      expect(response.status.calledWith(201)).true;
      expect(response.json.calledWith([1])).true;
    });
  });

  describe('Delete task', () => {
    const mockDeleteTask = {
      id: 1
    };
    const response = {};
    const request = { body: mockDeleteTask };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      sinon.stub(taskService, 'destroy').rejects(errorMock);
    });

    after(() => {
      taskService.destroy.restore();
    });

    it('Fail Delete', async () => {
      await taskController.destroy(request, response);

      expect(response.status.calledWith(500)).true;
      expect(response.json.calledWith(errorMessage)).true;
    });
  });

  describe('Delete task', () => {
    const mockDeleteTask = {
      id: 1
    };
    const response = {};
    const request = { body: mockDeleteTask };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      sinon.stub(taskService, 'destroy').resolves([1]);
    });

    after(() => {
      taskService.destroy.restore();
    });

    it('Sucsses Deleted', async () => {
      await taskController.destroy(request, response);

      expect(response.status.calledWith(204)).true;
      expect(response.json.calledWith()).true;
    });
  });

  describe('Get all tasks', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      sinon.stub(taskService, 'getAll').rejects(errorMock);
    });

    after(() => {
      taskService.getAll.restore();
    });

    it('Fail get all', async () => {
      await taskController.getAll(request, response);

      expect(response.status.calledWith(500)).true;
      expect(response.json.calledWith(errorMessage)).true;
    });
  });

  describe('Get all tasks', () => {
    const mockAllTasks = [
      {
        id: 6,
        task: "Nova task",
        status: "to do",
        priority: "high"
      },{
        id: 7,
        task: "Nova task dois",
        status: "in progress",
        priority: "high"
      },{
        id: 8,
        task: "Nova task três",
        status: "to do",
        priority: "low"
      }
    ];
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      sinon.stub(taskService, 'getAll').resolves(mockAllTasks);
    });

    after(() => {
      taskService.getAll.restore();
    });

    it('Sucsses get all', async () => {
      await taskController.getAll(request, response);

      expect(response.status.calledWith(200)).true;
      expect(response.json.calledWith(mockAllTasks)).true;
    });
  });
});