/**
 * Jest unit tests for setup function
 * This file tests the setup function from sketch single.js
 */

// Mock p5.js global functions
const createCanvasMock = jest.fn();
const windowWidthMock = 1920;
const windowHeightMock = 1080;

// Set up global p5.js mocks
global.createCanvas = createCanvasMock;
global.windowWidth = windowWidthMock;
global.windowHeight = windowHeightMock;
global.loadImage = jest.fn();
global.resizeCanvas = jest.fn();
global.background = jest.fn();
global.image = jest.fn();
global.push = jest.fn();
global.pop = jest.fn();
global.translate = jest.fn();
global.scale = jest.fn();
global.min = jest.fn((a, b) => (a < b ? a : b));
global.dist = jest.fn();
global.fill = jest.fn();
global.rect = jest.fn();
global.textSize = jest.fn();
global.text = jest.fn();
global.mouseX = 0;
global.mouseY = 0;
global.drawingContext = {
  shadowBlur: 0,
  shadowColor: ''
};

// Import the module under test
// Note: We need to require after setting up mocks
require('../sketch single.js');

describe('setup function', () => {
  
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  /**
   * Test Case 1: Normal scenario - setup creates canvas with window dimensions
   * This is the main functionality test
   */
  test('should create canvas with windowWidth and windowHeight in normal scenario', () => {
    // Execute setup function
    setup();
    
    // Verify createCanvas was called with correct parameters
    expect(createCanvasMock).toHaveBeenCalledTimes(1);
    expect(createCanvasMock).toHaveBeenCalledWith(windowWidthMock, windowHeightMock);
  });

  /**
   * Test Case 2: Boundary test - minimum window size
   * Test with very small window dimensions
   */
  test('should create canvas correctly with minimum window dimensions', () => {
    // Mock minimum window dimensions
    global.windowWidth = 320;
    global.windowHeight = 240;
    
    // Execute setup function
    setup();
    
    // Verify createCanvas was called with minimum dimensions
    expect(createCanvasMock).toHaveBeenCalledTimes(1);
    expect(createCanvasMock).toHaveBeenCalledWith(320, 240);
  });

  /**
   * Test Case 3: Boundary test - large window size
   * Test with very large window dimensions
   */
  test('should create canvas correctly with large window dimensions', () => {
    // Mock large window dimensions
    global.windowWidth = 3840;
    global.windowHeight = 2160;
    
    // Execute setup function
    setup();
    
    // Verify createCanvas was called with large dimensions
    expect(createCanvasMock).toHaveBeenCalledTimes(1);
    expect(createCanvasMock).toHaveBeenCalledWith(3840, 2160);
  });

  /**
   * Test Case 4: Boundary test - square window
   * Test with square window dimensions
   */
  test('should create canvas correctly with square window dimensions', () => {
    // Mock square window dimensions
    global.windowWidth = 1024;
    global.windowHeight = 1024;
    
    // Execute setup function
    setup();
    
    // Verify createCanvas was called with square dimensions
    expect(createCanvasMock).toHaveBeenCalledTimes(1);
    expect(createCanvasMock).toHaveBeenCalledWith(1024, 1024);
  });

  /**
   * Test Case 5: Boundary test - portrait window
   * Test with portrait window dimensions
   */
  test('should create canvas correctly with portrait window dimensions', () => {
    // Mock portrait window dimensions
    global.windowWidth = 768;
    global.windowHeight = 1366;
    
    // Execute setup function
    setup();
    
    // Verify createCanvas was called with portrait dimensions
    expect(createCanvasMock).toHaveBeenCalledTimes(1);
    expect(createCanvasMock).toHaveBeenCalledWith(768, 1366);
  });

  /**
   * Test Case 6: Boundary test - landscape window
   * Test with landscape window dimensions (standard 16:9 ratio)
   */
  test('should create canvas correctly with standard 16:9 landscape dimensions', () => {
    // Mock standard landscape dimensions
    global.windowWidth = 1920;
    global.windowHeight = 1080;
    
    // Execute setup function
    setup();
    
    // Verify createCanvas was called with standard 16:9 dimensions
    expect(createCanvasMock).toHaveBeenCalledTimes(1);
    expect(createCanvasMock).toHaveBeenCalledWith(1920, 1080);
  });

  /**
   * Test Case 7: Boundary test - ultra-wide window
   * Test with ultra-wide window dimensions (21:9 ratio)
   */
  test('should create canvas correctly with ultra-wide window dimensions', () => {
    // Mock ultra-wide window dimensions
    global.windowWidth = 2560;
    global.windowHeight = 1080;
    
    // Execute setup function
    setup();
    
    // Verify createCanvas was called with ultra-wide dimensions
    expect(createCanvasMock).toHaveBeenCalledTimes(1);
    expect(createCanvasMock).toHaveBeenCalledWith(2560, 1080);
  });

  /**
   * Test Case 8: Edge case - very small window
   * Test with extremely small window dimensions
   */
  test('should create canvas correctly with extremely small window dimensions', () => {
    // Mock extremely small window dimensions
    global.windowWidth = 100;
    global.windowHeight = 100;
    
    // Execute setup function
    setup();
    
    // Verify createCanvas was called with extremely small dimensions
    expect(createCanvasMock).toHaveBeenCalledTimes(1);
    expect(createCanvasMock).toHaveBeenCalledWith(100, 100);
  });

  /**
   * Test Case 9: Multiple setup calls
   * Test that setup can be called multiple times
   */
  test('should handle multiple calls to setup function', () => {
    global.windowWidth = 1280;
    global.windowHeight = 720;
    
    // Call setup multiple times
    setup();
    setup();
    setup();
    
    // Verify createCanvas was called 3 times
    expect(createCanvasMock).toHaveBeenCalledTimes(3);
    expect(createCanvasMock).toHaveBeenNthCalledWith(1, 1280, 720);
    expect(createCanvasMock).toHaveBeenNthCalledWith(2, 1280, 720);
    expect(createCanvasMock).toHaveBeenNthCalledWith(3, 1280, 720);
  });

  /**
   * Test Case 10: Dynamic window dimensions between setup calls
   * Test that setup respects current window dimensions
   */
  test('should use current window dimensions when called multiple times with different sizes', () => {
    // First call with one dimension
    global.windowWidth = 800;
    global.windowHeight = 600;
    setup();
    
    // Second call with different dimensions
    global.windowWidth = 1920;
    global.windowHeight = 1080;
    setup();
    
    // Verify each call used the appropriate dimensions
    expect(createCanvasMock).toHaveBeenCalledTimes(2);
    expect(createCanvasMock).toHaveBeenNthCalledWith(1, 800, 600);
    expect(createCanvasMock).toHaveBeenNthCalledWith(2, 1920, 1080);
  });

  /**
   * Test Case 11: Verify createCanvas is called with exact parameters
   * Test that the parameters are passed correctly without modification
   */
  test('should pass window dimensions exactly as parameters without modification', () => {
    const testWidth = 1440;
    const testHeight = 900;
    
    global.windowWidth = testWidth;
    global.windowHeight = testHeight;
    
    setup();
    
    // Verify exact parameters passed
    expect(createCanvasMock).toHaveBeenCalledWith(testWidth, testHeight);
  });

  /**
   * Test Case 12: Setup function structure
   * Test that setup function exists and is callable
   */
  test('should have a callable setup function', () => {
    expect(typeof setup).toBe('function');
    expect(setup).toBeDefined();
  });

  /**
   * Test Case 13: Zero dimension edge case
   * Test behavior when window dimensions are zero
   */
  test('should handle zero window dimensions', () => {
    global.windowWidth = 0;
    global.windowHeight = 0;
    
    expect(() => {
      setup();
    }).not.toThrow();
    
    expect(createCanvasMock).toHaveBeenCalledWith(0, 0);
  });

  /**
   * Test Case 14: Mobile device dimensions
   * Test with typical mobile device screen sizes
   */
  test('should create canvas correctly with mobile device dimensions', () => {
    // Mock iPhone 14 Pro dimensions
    global.windowWidth = 393;
    global.windowHeight = 852;
    
    setup();
    
    expect(createCanvasMock).toHaveBeenCalledTimes(1);
    expect(createCanvasMock).toHaveBeenCalledWith(393, 852);
  });

  /**
   * Test Case 15: Tablet device dimensions
   * Test with typical tablet device screen sizes
   */
  test('should create canvas correctly with tablet device dimensions', () => {
    // Mock iPad Pro dimensions
    global.windowWidth = 1024;
    global.windowHeight = 1366;
    
    setup();
    
    expect(createCanvasMock).toHaveBeenCalledTimes(1);
    expect(createCanvasMock).toHaveBeenCalledWith(1024, 1366);
  });
});