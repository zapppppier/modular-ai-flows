import { useState, useCallback } from 'react';
import { OpenAIService, ChatMessage } from '@/services/openai';

export interface UseOpenAIOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface TestResult {
  input: string;
  output: string;
  tokens: number;
  cost: number;
  duration: number;
  model: string;
}

export const useOpenAI = (options: UseOpenAIOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const openAI = new OpenAIService();

  const testConnection = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const connected = await openAI.testConnection();
      setIsConnected(connected);
      return connected;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection test failed');
      setIsConnected(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const testNode = useCallback(async (input: string): Promise<TestResult | null> => {
    if (!input.trim()) {
      setError('Input cannot be empty');
      return null;
    }

    setIsLoading(true);
    setError(null);
    
    const startTime = Date.now();
    
    try {
      const messages: ChatMessage[] = [];
      
      if (options.systemPrompt) {
        messages.push({
          role: 'system',
          content: options.systemPrompt
        });
      }
      
      messages.push({
        role: 'user',
        content: input
      });

      const response = await openAI.chat(messages, {
        model: options.model || 'gpt-3.5-turbo',
        temperature: options.temperature || 0.7,
        maxTokens: options.maxTokens || 1000
      });

      const duration = Date.now() - startTime;
      const output = response.choices[0]?.message?.content || 'No response';
      const cost = openAI.calculateCost(response.usage, response.model);

      const result: TestResult = {
        input,
        output,
        tokens: response.usage.total_tokens,
        cost,
        duration,
        model: response.model
      };

      setLastResult(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'API call failed';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  const streamResponse = useCallback(async function* (
    input: string,
    onChunk?: (chunk: string) => void
  ): AsyncGenerator<string, void, unknown> {
    if (!input.trim()) {
      setError('Input cannot be empty');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const messages: ChatMessage[] = [];
      
      if (options.systemPrompt) {
        messages.push({
          role: 'system',
          content: options.systemPrompt
        });
      }
      
      messages.push({
        role: 'user',
        content: input
      });

      const stream = openAI.chatStream(messages, {
        model: options.model || 'gpt-3.5-turbo',
        temperature: options.temperature || 0.7,
        maxTokens: options.maxTokens || 1000
      });

      for await (const chunk of stream) {
        if (onChunk) {
          onChunk(chunk);
        }
        yield chunk;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Streaming failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  return {
    isLoading,
    isConnected,
    lastResult,
    error,
    testConnection,
    testNode,
    streamResponse,
    clearError: () => setError(null)
  };
};