using System;

namespace factoids
{
    class factoids
    {
        private static Random random = new Random();
        public static void Main(String[] args)
        {
            for (int i = 2; i <= 15; i++)
            {
                double sum = 0.00F;
                int countSmaller = 0;
                double factorialResult = Factorial(i);
                Console.WriteLine($"The factorial of {i} is {factorialResult}");
                for (int r = 0; r <= 1000; r++)
                {
                    double fact = Factoid(i);
                    sum += fact;
                    if (fact < factorialResult)
                    {
                        countSmaller++;
                    }

                }
                double average = sum / 1000;
                Console.WriteLine($"The factoid is: {average}");
                int percentSmaller = countSmaller / 10;
                Console.WriteLine($"Percentage of factoids smaller than " +
                    $"factorials: {percentSmaller}%", percentSmaller);
            }
        }

        public static double Factorial(int n)
        {
            int fact = n;
            for (int i = n - 1; i >= 1; i--)
            {
                fact *= i;
            }
            return fact;
        }
        public static double Factoid(int n)
        {
            double retVal = 1.0;
            int rand = n > 0 ? random.Next(1, n + 1) : 1;
            if (rand > 1)
            {
                retVal = rand * Factoid(n);
            }
            return retVal;
        }

        public static double FactoidNonRecursive(int n)
        {
            double retVal = 1.0;
            int rand = n > 0 ? random.Next(1, n + 1) : 1;
            if (rand == 0) return 1;

            if (rand > 1)
            {
                retVal = rand * FactoidNonRecursive(n-1);
            }
            return retVal;
        }
    }

}