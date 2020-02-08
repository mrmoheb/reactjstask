import React from 'react';
import { render } from '@testing-library/react';
import TodoList from './components/TodoList';
import Posts from './components/Posts';

test('renders Todo List', () => {
  const { getByText } = render(<TodoList />);
  const linkElement = getByText(/My Todo List/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders Posts', () => {
  const { getByText } = render(<Posts />);
  const linkElement = getByText(/Posts/i);
  expect(linkElement).toBeInTheDocument();
});