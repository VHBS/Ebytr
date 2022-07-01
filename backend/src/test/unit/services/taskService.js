const { expect } = require('chai');
const sinon = require('sinon');
const taskService = require('../../../service/taskService');
const { Task } = require('../../../database/models');

describe('Testing task service', () => {
  describe('Create new task', () => {
    const mockNewTask = {
      id: 3,
      task: "Nova task",
      status: "ativa",
      priority: "urgente",
      updatedAt: "2022-07-01T21:05:20.834Z",
      createdAt: "2022-07-01T21:05:20.834Z"
    }

    before(() => {
      sinon.stub(Task, 'create').resolves(mockNewTask);
    });

    after(() => {
      Task.create.restore();
    });

    it('Sucsses created', async () => {
      const result = await taskService.create({
        task: "Nova task",
        status: "ativa",
        priority: "urgente"
      });
      expect(result).deep.equal(mockNewTask)
    });
  });
});