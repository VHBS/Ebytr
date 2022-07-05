const { expect } = require('chai');
const sinon = require('sinon');
const taskService = require('../../../service/taskService');
const { Task } = require('../../../database/models');

describe('Testing task service', () => {
  describe('Create task', () => {
    const mockNewTask = {
      id: 6,
      task: "Nova task",
      status: "to do",
      priority: "high"
    };

    before(() => {
      sinon.stub(Task, 'create').resolves(mockNewTask);
    });

    after(() => {
      Task.create.restore();
    });

    it('Sucsses created', async () => {
      const result = await taskService.create({
        task: "Nova task",
        status: "to do",
        priority: "high"
      });
      expect(result).deep.equal(mockNewTask)
    });
  });

  describe('Update task', () => {
    const mockUpdatedTask = {
      id: 6,
      task: "Nova task",
      status: "finished",
      priority: "high"
    }

    before(() => {
      sinon.stub(Task, 'update').resolves([1]);
    });

    after(() => {
      Task.update.restore();
    });

    it('Sucsses updated', async () => {
      const result = await taskService.update(mockUpdatedTask);
      expect(result).deep.equal([1])
    });
  });

  describe('Delete task', () => {
    before(() => {
      sinon.stub(Task, 'destroy').resolves([1]);
    });

    after(() => {
      Task.destroy.restore();
    });

    it('Sucsses updated', async () => {
      const result = await taskService.destroy(1);
      expect(result).deep.equal([1])
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

    before(() => {
      sinon.stub(Task, 'findAll').resolves(mockAllTasks);
    });

    after(() => {
      Task.findAll.restore();
    });

    it('Sucsses get all', async () => {
      const result = await taskService.getAll();
      expect(result).deep.equal(mockAllTasks)
    });
  });
});