import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatBot from '../ChatBot';

// Mock fetch API for chat messages
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ response: "Hello from mock backend" }),
  })
);

describe('ChatBot Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders chat button and opens chat window on click', () => {
    render(<ChatBot />);
    const chatButton = screen.getByTitle(/Chat with TeacherWorld Assistant/i);
    expect(chatButton).toBeInTheDocument();

    fireEvent.click(chatButton);

    const chatHeaders = screen.getAllByText(/TeacherWorld Assistant/i);
    expect(chatHeaders[0]).toBeInTheDocument();
  });

  test('sends user message and displays bot response', async () => {
    render(<ChatBot />);
    const chatButton = screen.getByTitle(/Chat with TeacherWorld Assistant/i);
    fireEvent.click(chatButton);

    const input = screen.getByPlaceholderText(/Ask me anything/i);
    fireEvent.change(input, { target: { value: 'Hello bot' } });
    expect(input.value).toBe('Hello bot');

    const sendButton = screen.getByRole('button', { name: 'Send Message' });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Hello bot')).toBeInTheDocument();
      expect(screen.getByText('Hello from mock backend')).toBeInTheDocument();
    });
  });

  test('shows error message on fetch failure', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('API is down'));

    render(<ChatBot />);
    fireEvent.click(screen.getByTitle(/Chat with TeacherWorld Assistant/i));

    const input = screen.getByPlaceholderText(/Ask me anything/i);
    fireEvent.change(input, { target: { value: 'Test error' } });

    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
      expect(screen.getByText(/Failed to get response/i)).toBeInTheDocument();
    });
  });

  test('input clears after sending message', async () => {
    render(<ChatBot />);
    fireEvent.click(screen.getByTitle(/Chat with TeacherWorld Assistant/i));

    const input = screen.getByPlaceholderText(/Ask me anything/i);
    fireEvent.change(input, { target: { value: 'Clear input test' } });

    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });
});
