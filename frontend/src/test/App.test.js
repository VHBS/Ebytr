import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from '../App';
jest.mock("axios");

afterEach(cleanup);

test('Render tasks', async () => {
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

    const spyAxios = jest.spyOn(axios, 'get')
    spyAxios.mockResolvedValue({ data: mockAllTasks });

    const { getByTestId } = render(<App/>);
    const taskOne = await waitFor(() => getByTestId('Nova task'));
    const taskTwo = await waitFor(() => getByTestId('Nova task dois'));
    const taskThree = await waitFor(() => getByTestId('Nova task três'));
    expect(taskOne).toBeInTheDocument();
    expect(taskTwo).toBeInTheDocument();
    expect(taskThree).toBeInTheDocument();

  //https://stackoverflow.com/questions/60115885/how-to-solve-the-update-was-not-wrapped-in-act-warning-in-testing-library-re
});
