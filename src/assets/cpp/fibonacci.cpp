#include <emscripten.h>

extern "C"
{

    EMSCRIPTEN_KEEPALIVE
    int fibonacciWithRecursion(int n)
    {
        if (n == 0 || n == 1)
            return n;
        else
            return (fibonacciWithRecursion(n - 1) + fibonacciWithRecursion(n - 2));
    }

    static long fibonacciWithLoopRes[2];

    EMSCRIPTEN_KEEPALIVE
    void fibonacciWithLoop(int n)
    {
        fibonacciWithLoopRes[0] = 0;
        fibonacciWithLoopRes[1] = n;

        if (n > 1)
        {
            long long int last = 0;
            long long int current = 1;
            long long int temp;

            for (int idx = 2; idx <= n; idx++)
            {
                temp = current;
                current = last + current;
                last = temp;
            }

            fibonacciWithLoopRes[0] = current >> 32;
            fibonacciWithLoopRes[1] = current & 0xFFFFFFFF;
        }
    }

    EMSCRIPTEN_KEEPALIVE
    long getResMs()
    {
        return fibonacciWithLoopRes[0];
    }

    EMSCRIPTEN_KEEPALIVE
    long getResLs()
    {
        return fibonacciWithLoopRes[1];
    }
}