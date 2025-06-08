/**
 * Starter code templates for different programming languages
 */

export const codeTemplates: { [key: string]: string } = {
  javascript: `function solution(input) {
  // Parse input if needed
  // input = input.trim().split(/\\s+/).map(Number);
  
  // Write your code here
  
  return;
}

// Example usage
const result = solution(input);
console.log(result);`,

  python: `def solution(input):
    # Parse input if needed
    # input = list(map(int, input.strip().split()))
    
    # Write your code here
    
    return

# Example usage
result = solution(input)
print(result)`,

  java: `import java.util.*;

class Solution {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        
        // Parse input if needed
        // String[] parts = input.trim().split("\\\\s+");
        
        // Write your code here
        
        System.out.println(result);
    }
}`,

  cpp: `#include <iostream>
#include <string>
#include <vector>
#include <sstream>
using namespace std;

int main() {
    string input;
    getline(cin, input);
    
    // Parse input if needed
    // vector<int> numbers;
    // stringstream ss(input);
    // int n;
    // while (ss >> n) {
    //     numbers.push_back(n);
    // }
    
    // Write your code here
    
    cout << result << endl;
    return 0;
}`,

  csharp: `using System;
using System.Linq;

class Solution {
    static void Main() {
        string input = Console.ReadLine();
        
        // Parse input if needed
        // int[] numbers = input.Split().Select(int.Parse).ToArray();
        
        // Write your code here
        
        Console.WriteLine(result);
    }
}`,

  ruby: `# Read input
input = gets.chomp

# Parse input if needed
# numbers = input.split.map(&:to_i)

# Write your code here

# Output result
puts result`,

  go: `package main

import (
    "fmt"
    "strings"
    "strconv"
)

func main() {
    var input string
    fmt.Scanln(&input)
    
    // Parse input if needed
    // parts := strings.Fields(input)
    // numbers := make([]int, len(parts))
    // for i, p := range parts {
    //     numbers[i], _ = strconv.Atoi(p)
    // }
    
    // Write your code here
    
    fmt.Println(result)
}`,

  kotlin: `import java.util.*

fun main(args: Array<String>) {
    val input = readLine()!!
    
    // Parse input if needed
    // val numbers = input.trim().split("\\s+".toRegex()).map { it.toInt() }
    
    // Write your code here
    
    println(result)
}`,

  rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let input = stdin.lock().lines().next().unwrap().unwrap();
    
    // Parse input if needed
    // let numbers: Vec<i32> = input.split_whitespace()
    //     .map(|s| s.parse().unwrap())
    //     .collect();
    
    // Write your code here
    
    println!("{}", result);
}`,

  php: `<?php
$input = trim(fgets(STDIN));

// Parse input if needed
// $numbers = array_map('intval', explode(' ', $input));

// Write your code here

echo $result . "\\n";
?>`,
};

/**
 * Returns starter code template for the given language
 */
export function getStarterCode(language: string): string {
  return codeTemplates[language] || "// Write your solution here";
}
