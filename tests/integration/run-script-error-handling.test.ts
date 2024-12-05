import { runScript } from '../../src/exec-utils.js';

describe('runScript error handling', () => {
  test('should propagate execFileWithInput errors', async () => {
    try {
      await runScript({
        script: 'nonexistentcommand',
        interpreter: 'bash'
      });
      fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.stderr).toContain('nonexistentcommand');
      expect(error.message).toBeTruthy();
    }
  });

  test('should handle fish shell error propagation with workaround', async () => {
    try {
      await runScript({
        script: 'nonexistentcommand',
        interpreter: 'fish'
      });
      fail('Should have thrown an error');
    } catch (error: any) {
      // Fish shell specific error handling
      expect(error.stderr).toContain('nonexistentcommand');
      expect(error.message).toBeTruthy();
    }
  });

  test('should handle invalid interpreter', async () => {
    try {
      await runScript({
        script: 'echo "test"',
        interpreter: 'invalidshell'
      });
      fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).toBeTruthy();
      // On macOS, the error should indicate the shell could not be found
      expect(error.stderr).toMatch(/no such file|not found|cannot find/i);
    }
  });

  test('should handle empty script gracefully', async () => {
    const result = await runScript({
      script: '',
      interpreter: 'bash'
    });
    expect(result.stdout).toBe('');
    expect(result.stderr).toBe('');
  });

  test('should handle scripts with syntax errors', async () => {
    try {
      await runScript({
        script: 'if [ true ] then\necho "invalid syntax"\nfi',
        interpreter: 'bash'
      });
      fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.stderr).toContain('syntax error');
      expect(error.message).toBeTruthy();
    }
  });

  // Test custom working directory error handling
  test('should handle invalid working directory', async () => {
    try {
      await runScript({
        script: 'pwd',
        interpreter: 'bash',
        cwd: '/nonexistent/directory'
      });
      fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).toBeTruthy();
      // Error should indicate the directory doesn't exist
      expect(error.message).toMatch(/no such file|not found|cannot find/i);
    }
  });
});