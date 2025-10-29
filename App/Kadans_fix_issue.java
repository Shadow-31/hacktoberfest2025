public class Kadans_fix_issue {
    /*
     * 
    Problem:
If all elements in the array are negative (e.g., {-5, -3, -1}),
code would output 0, which is incorrect.
The correct maximum subarray sum in such a case is the largest (least negative) number, which is -1.

Fix:
Track the maximum sum without forcing currsum to zero in the beginning and only reset currsum when 
necessary after updating maxsum.
     */
        public static void main(String[] args) {
            int numbers[] = {-1,-2,-3,-4,-6,-7,-5,-8,-9,-10};
            kadanes_algo(numbers);
        }
    
        public static void kadanes_algo(int numbers[]) {
            int maxsum = numbers[0]; // Initialize to first element
            int currsum = numbers[0]; // Also initialize to first element
    
            for (int i = 1; i < numbers.length; i++) {
                currsum = Math.max(numbers[i], currsum + numbers[i]);
                maxsum = Math.max(maxsum, currsum);
            }
    
            System.out.println("The maximum sum is: " + maxsum);
        }
}
