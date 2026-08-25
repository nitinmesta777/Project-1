import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Home, Map as MapIcon, Code2, TrendingUp, User, Flame, CheckCircle2, Lock,
  ChevronRight, ChevronLeft, Lightbulb, Eye, X, Award, Zap, BookOpen, Star,
  ArrowLeft, RotateCcw, Bookmark, Play, Terminal, Target, Trophy
} from "lucide-react";

/* ============================== DATA ============================== */

const PHASES = [
  { id: 1, name: "Foundations", range: [1, 5] },
  { id: 2, name: "Searching & Sorting", range: [6, 10] },
  { id: 3, name: "Hashing", range: [11, 14] },
  { id: 4, name: "Recursion", range: [15, 17] },
  { id: 5, name: "Linked Lists", range: [18, 21] },
  { id: 6, name: "Stack & Queue", range: [22, 24] },
  { id: 7, name: "Trees", range: [25, 28] },
  { id: 8, name: "Graphs", range: [29, 32] },
  { id: 9, name: "Advanced DSA", range: [33, 40] },
];

const TITLES = [
  "Big-O Time & Space Complexity", "Arrays / Lists", "Strings", "Two Pointers", "Sliding Window",
  "Linear Search", "Binary Search", "Basic Sorting", "Merge Sort", "Quick Sort",
  "Hash Maps / Dictionaries", "Sets", "Frequency Counting", "Hashing Problems",
  "Recursion Basics", "Recursion Problems", "Backtracking Basics",
  "Linked List Basics", "Insert/Delete/Search", "Reverse Linked List", "Fast & Slow Pointers",
  "Stack", "Queue", "Monotonic Stack / Important Problems",
  "Binary Trees", "Tree Traversals", "Binary Search Tree", "Tree Problems",
  "Graph Basics", "BFS", "DFS", "Graph Problems",
  "Heap / Priority Queue", "Greedy Algorithms", "Dynamic Programming Basics", "DP Problems",
  "Mixed DSA Problems", "Interview Problems", "Mock DSA Test", "Final DSA Assessment",
];

function phaseForDay(day) {
  return PHASES.find(p => day >= p.range[0] && day <= p.range[1]);
}

const FLAGSHIP = {
  1: {
    concept: "Big-O notation describes how the runtime or memory use of your code grows as input size grows. It's not about exact seconds — it's about the shape of growth.",
    example: "Think of it like judging a delivery service: does the time to deliver grow slowly (one truck, one route) or explode (a new truck for every single package)?",
    code: `def find_max(nums):
    max_val = nums[0]
    for n in nums:
        if n > max_val:
            max_val = n
    return max_val`,
    codeExplain: [
      "Start by assuming the first element is the largest.",
      "Loop through every element once — this single pass is why the runtime is O(n).",
      "Update max_val whenever a bigger number appears.",
      "No nested loops or growing data structures, so space stays O(1).",
    ],
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    complexityWhy: "Every element is visited exactly once, so time grows linearly with n. Only one variable is stored, so space doesn't grow with input size.",
    mistakes: [
      "Confusing 'fast in practice' with 'good Big-O' — a small test input can hide a bad algorithm.",
      "Forgetting that nested loops over the same input usually mean O(n²), not O(n).",
      "Ignoring space complexity and only thinking about time.",
    ],
    quiz: { question: "A function with one loop over n elements and no nested loops is usually:", options: ["O(1)", "O(n)", "O(n²)", "O(log n)"], answerIndex: 1 },
    problems: [
      {
        title: "Find the Minimum", difficulty: "Easy",
        statement: "Given a list of integers, return the smallest value.",
        exampleInput: "[5, 2, 9, 1, 7]", exampleOutput: "1",
        constraints: "1 <= len(nums) <= 10^5",
        hints: ["You only need one pass through the list.", "Track the smallest value seen so far, the mirror image of tracking a max."],
        logic: "Start with the first element as your candidate minimum, then compare every other element against it, updating whenever you find something smaller.",
        solution: `def find_min(nums):
    min_val = nums[0]
    for n in nums:
        if n < min_val:
            min_val = n
    return min_val`,
        timeComplexity: "O(n)", spaceComplexity: "O(1)",
      },
      {
        title: "Count Occurrences", difficulty: "Easy",
        statement: "Given a list and a target value, count how many times the target appears.",
        exampleInput: "nums=[1,2,2,3,2], target=2", exampleOutput: "3",
        constraints: "1 <= len(nums) <= 10^5",
        hints: ["A single counter variable is enough.", "You don't need to store positions, just count matches."],
        logic: "Loop through the list once, incrementing a counter every time the current element equals the target.",
        solution: `def count_occurrences(nums, target):
    count = 0
    for n in nums:
        if n == target:
            count += 1
    return count`,
        timeComplexity: "O(n)", spaceComplexity: "O(1)",
      },
    ],
  },
  2: {
    concept: "Arrays (Python lists) store elements in contiguous, indexed order. Index access is instant, but inserting or removing from the middle shifts every element after it.",
    example: "Like numbered lockers in a hallway — grabbing locker #42 is instant, but squeezing a new locker in at #10 means shifting every locker after it.",
    code: `nums = [10, 20, 30, 40]
nums.append(50)        # add to end
nums.insert(1, 15)     # insert at index 1
nums.pop()              # remove last
print(nums[2])          # index access`,
    codeExplain: [
      "append() adds to the end in O(1) amortized time.",
      "insert() at a specific index shifts later elements, costing O(n).",
      "pop() without an index removes the last item in O(1).",
      "Indexing with [] is always O(1) regardless of list size.",
    ],
    timeComplexity: "Access O(1), insert/delete at end O(1), middle O(n)", spaceComplexity: "O(n)",
    complexityWhy: "Lists are stored contiguously, so index math gives instant access, but shifting elements after a middle insertion/deletion takes time proportional to how many elements move.",
    mistakes: [
      "Using insert(0, x) in a loop — this is O(n) every time, making the loop O(n²).",
      "Forgetting list.pop(0) is also O(n), not O(1).",
      "Modifying a list while iterating over it directly.",
    ],
    quiz: { question: "Which operation on a Python list is O(1)?", options: ["insert(0, x)", "append(x)", "pop(0)", "x in list"], answerIndex: 1 },
    problems: [
      {
        title: "Reverse an Array In-Place", difficulty: "Easy",
        statement: "Reverse the order of elements in a list without using extra space.",
        exampleInput: "[1,2,3,4]", exampleOutput: "[4,3,2,1]",
        constraints: "1 <= len(nums) <= 10^5",
        hints: ["Use two pointers — one at each end.", "Swap elements and move the pointers toward the center."],
        logic: "Point one index at the start and one at the end. Swap the elements they point to, then move the pointers toward each other until they meet.",
        solution: `def reverse_array(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1
    return nums`,
        timeComplexity: "O(n)", spaceComplexity: "O(1)",
      },
      {
        title: "Remove Duplicates from Sorted Array", difficulty: "Medium",
        statement: "Given a sorted list, remove duplicates in-place so each element appears once, and return the new length.",
        exampleInput: "[1,1,2,2,3]", exampleOutput: "3 (array becomes [1,2,3,...])",
        constraints: "Array is sorted ascending.",
        hints: ["Use a 'slow' pointer for the position of the last unique element.", "A 'fast' pointer scans ahead looking for the next different value."],
        logic: "Keep a slow pointer at the last confirmed unique element. Walk a fast pointer ahead; whenever it finds a different value, advance slow and copy the value there.",
        solution: `def remove_duplicates(nums):
    if not nums:
        return 0
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    return slow + 1`,
        timeComplexity: "O(n)", spaceComplexity: "O(1)",
      },
    ],
  },
  4: {
    concept: "The two-pointer technique uses two indices moving through a structure (often from opposite ends or at different speeds) to avoid nested loops.",
    example: "Like two people searching a sorted bookshelf from opposite ends and meeting in the middle, instead of one person checking every book against every other book.",
    code: `def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True`,
    codeExplain: [
      "Two pointers start at opposite ends of the string.",
      "They move toward each other, comparing characters.",
      "Any mismatch means it's not a palindrome — exit early.",
      "The loop stops once the pointers cross, having checked every pair once.",
    ],
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
    complexityWhy: "Each pointer moves at most n/2 steps, so total work is linear. No extra structures grow with input size.",
    mistakes: [
      "Using two nested loops (O(n²)) when a sorted array makes two pointers possible in O(n).",
      "Forgetting the array often needs to be sorted for the opposite-ends pattern to work correctly.",
      "Off-by-one errors in the while condition (< vs <=).",
    ],
    quiz: { question: "Two pointers are most useful for reducing which pattern to O(n)?", options: ["Random access lookups", "Nested loops comparing pairs in a sorted structure", "Recursive tree traversal", "Hash map insertion"], answerIndex: 1 },
    problems: [
      {
        title: "Two Sum (Sorted Array)", difficulty: "Easy",
        statement: "Given a sorted list and a target, return the indices of two numbers that add up to target.",
        exampleInput: "nums=[2,7,11,15], target=9", exampleOutput: "[0,1]",
        constraints: "Array is sorted ascending.",
        hints: ["Start pointers at both ends of the array.", "If the sum is too big, move the right pointer left; too small, move the left pointer right."],
        logic: "Because the array is sorted, a too-large sum means the right value is too big; a too-small sum means the left value needs to grow.",
        solution: `def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        total = nums[left] + nums[right]
        if total == target:
            return [left, right]
        elif total < target:
            left += 1
        else:
            right -= 1
    return []`,
        timeComplexity: "O(n)", spaceComplexity: "O(1)",
      },
      {
        title: "Container With Most Water", difficulty: "Medium",
        statement: "Given heights of vertical lines, find two lines that together with the x-axis form the container holding the most water.",
        exampleInput: "[1,8,6,2,5,4,8,3,7]", exampleOutput: "49",
        constraints: "2 <= len(heights) <= 10^5",
        hints: ["Start with the widest container: pointers at both ends.", "The shorter line always limits the water — move that pointer inward."],
        logic: "Track max area as width * min(height[left], height[right]). Always move the pointer at the shorter line inward, since keeping the taller one can only help.",
        solution: `def max_area(heights):
    left, right = 0, len(heights) - 1
    best = 0
    while left < right:
        width = right - left
        best = max(best, width * min(heights[left], heights[right]))
        if heights[left] < heights[right]:
            left += 1
        else:
            right -= 1
    return best`,
        timeComplexity: "O(n)", spaceComplexity: "O(1)",
      },
    ],
  },
  7: {
    concept: "Binary search finds a target in a sorted list by repeatedly halving the search range, comparing the middle element to the target.",
    example: "Like looking up a word in a paper dictionary — open to the middle, decide which half your word is in, and repeat, instead of scanning page by page.",
    code: `def binary_search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    codeExplain: [
      "low and high define the current search window.",
      "mid is the midpoint; comparing nums[mid] to target tells us which half to keep.",
      "If nums[mid] is too small, the answer must be to the right — move low up.",
      "The window shrinks by half every iteration, which is why it's O(log n).",
    ],
    timeComplexity: "O(log n)", spaceComplexity: "O(1)",
    complexityWhy: "Each comparison eliminates half the remaining elements, so the number of steps grows with log base 2 of n rather than n itself.",
    mistakes: [
      "Forgetting the array must be sorted first.",
      "Off-by-one errors: using < instead of <= and missing the last element.",
      "Not updating low/high correctly, causing an infinite loop.",
    ],
    quiz: { question: "Binary search requires the input to be:", options: ["Sorted", "A linked list", "All positive numbers", "A perfect square in length"], answerIndex: 0 },
    problems: [
      {
        title: "Search Insert Position", difficulty: "Easy",
        statement: "Given a sorted list and a target, return the index where target is found, or where it would be inserted.",
        exampleInput: "nums=[1,3,5,6], target=5", exampleOutput: "2",
        constraints: "Array sorted ascending, no duplicates.",
        hints: ["Standard binary search, but track where low ends up.", "When the loop ends, low points to the correct insert position."],
        logic: "Run standard binary search. If the target isn't found, low converges to the exact index where it should be inserted to keep the array sorted.",
        solution: `def search_insert(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return low`,
        timeComplexity: "O(log n)", spaceComplexity: "O(1)",
      },
      {
        title: "Find First and Last Position", difficulty: "Medium",
        statement: "Given a sorted list with duplicates, find the first and last index of a target value.",
        exampleInput: "nums=[5,7,7,8,8,10], target=8", exampleOutput: "[3,4]",
        constraints: "Array sorted ascending.",
        hints: ["Run binary search twice: once biased left, once biased right.", "When nums[mid] == target, keep narrowing toward the edge you want instead of stopping."],
        logic: "For the left boundary, on a match keep searching the left half for an earlier one. For the right boundary, keep searching the right half for a later one.",
        solution: `def search_range(nums, target):
    def find_bound(leftmost):
        low, high, result = 0, len(nums) - 1, -1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                result = mid
                if leftmost:
                    high = mid - 1
                else:
                    low = mid + 1
            elif nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return result
    return [find_bound(True), find_bound(False)]`,
        timeComplexity: "O(log n)", spaceComplexity: "O(1)",
      },
    ],
  },
  11: {
    concept: "A hash map (Python dict) stores key-value pairs and gives near-instant lookup, insert, and delete by hashing the key to a memory slot.",
    example: "Like a library that files books by a computed code instead of alphabetical order — you jump straight to the shelf instead of scanning every book.",
    code: `counts = {}
for word in ["cat", "dog", "cat", "bird"]:
    counts[word] = counts.get(word, 0) + 1
print(counts)  # {'cat': 2, 'dog': 1, 'bird': 1}`,
    codeExplain: [
      "An empty dict starts with no keys.",
      "counts.get(word, 0) safely returns 0 if the key isn't present yet.",
      "Each lookup and update is O(1) on average.",
      "One pass through the list builds the full frequency map.",
    ],
    timeComplexity: "O(1) average get/set", spaceComplexity: "O(n)",
    complexityWhy: "Hashing converts a key directly to a storage slot, so lookups don't scan other entries — this makes average-case operations O(1), unlike a list's O(n) search.",
    mistakes: [
      "Assuming dict order guarantees sorted order (it preserves insertion order, not sorted order).",
      "Using a list and checking 'in' repeatedly (O(n) each time) instead of a set/dict (O(1)).",
      "Not handling missing keys, causing a KeyError instead of using .get() or defaultdict.",
    ],
    quiz: { question: "Average time to look up a key in a Python dict is:", options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"], answerIndex: 2 },
    problems: [
      {
        title: "Two Sum", difficulty: "Easy",
        statement: "Given an unsorted list and a target, return indices of two numbers that add up to target, in one pass.",
        exampleInput: "nums=[2,7,11,15], target=9", exampleOutput: "[0,1]",
        constraints: "Exactly one valid answer exists.",
        hints: ["Store each number's index in a dict as you go.", "For each number, check if target - number has already been seen."],
        logic: "Before adding the current number to the map, check whether its complement (target - current) is already a key. If so, you've found your pair.",
        solution: `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i
    return []`,
        timeComplexity: "O(n)", spaceComplexity: "O(n)",
      },
      {
        title: "Group Anagrams", difficulty: "Medium",
        statement: "Group a list of words into sets of anagrams.",
        exampleInput: "['eat','tea','tan','ate','nat','bat']", exampleOutput: "[['eat','tea','ate'],['tan','nat'],['bat']]",
        constraints: "1 <= len(words) <= 10^4",
        hints: ["Anagrams share the same sorted letters — use that as a dict key.", "Group words under their sorted-letters key, then return the dict's values."],
        logic: "For each word, sort its letters to get a canonical key. Words that are anagrams of each other produce the same key.",
        solution: `def group_anagrams(words):
    groups = {}
    for w in words:
        key = ''.join(sorted(w))
        groups.setdefault(key, []).append(w)
    return list(groups.values())`,
        timeComplexity: "O(n * k log k)", spaceComplexity: "O(n * k)",
      },
    ],
  },
  15: {
    concept: "Recursion solves a problem by having a function call itself on a smaller version of the same problem, with a base case that stops the calls.",
    example: "Like Russian nesting dolls — you open one to find a smaller one inside, until you reach the smallest doll that doesn't open (the base case).",
    code: `def factorial(n):
    if n <= 1:                    # base case
        return 1
    return n * factorial(n - 1)   # recursive case`,
    codeExplain: [
      "The base case (n <= 1) stops the recursion — without it, calls never end.",
      "The recursive case shrinks the problem (n-1) and trusts the function to solve that smaller piece.",
      "Each call waits on the stack for the smaller call to return.",
      "Results combine on the way back up: 4 * (3 * (2 * (1))).",
    ],
    timeComplexity: "O(n)", spaceComplexity: "O(n) call stack",
    complexityWhy: "There are n recursive calls before hitting the base case, and each call stays on the call stack until it returns.",
    mistakes: [
      "Forgetting the base case, causing infinite recursion and a stack overflow.",
      "Not actually shrinking the problem each call.",
      "Using recursion where a simple loop would be clearer and use less memory.",
    ],
    quiz: { question: "What happens if a recursive function has no base case?", options: ["It runs once and returns None", "Infinite recursion / stack overflow", "It automatically becomes iterative", "Python raises a SyntaxError"], answerIndex: 1 },
    problems: [
      {
        title: "Sum of a List (Recursive)", difficulty: "Easy",
        statement: "Compute the sum of a list using recursion instead of a loop.",
        exampleInput: "[1,2,3,4]", exampleOutput: "10",
        constraints: "0 <= len(nums) <= 10^4",
        hints: ["Base case: an empty list sums to 0.", "Recursive case: first element + sum of the rest of the list."],
        logic: "sum(list) = list[0] + sum(list[1:]), with sum([]) = 0 as the base case.",
        solution: `def recursive_sum(nums):
    if not nums:
        return 0
    return nums[0] + recursive_sum(nums[1:])`,
        timeComplexity: "O(n)", spaceComplexity: "O(n)",
      },
      {
        title: "Fibonacci Number", difficulty: "Medium",
        statement: "Return the nth Fibonacci number using recursion.",
        exampleInput: "n=6", exampleOutput: "8",
        constraints: "0 <= n <= 30",
        hints: ["Base cases: fib(0)=0, fib(1)=1.", "Recursive case: fib(n) = fib(n-1) + fib(n-2)."],
        logic: "Each call branches into two smaller calls until hitting a base case, and results combine going back up the tree.",
        solution: `def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)`,
        timeComplexity: "O(2^n) naive (O(n) with memoization)", spaceComplexity: "O(n) stack depth",
      },
    ],
  },
  18: {
    concept: "A linked list stores elements as nodes, each pointing to the next, rather than in one contiguous block like an array. Insertion/deletion at the front is O(1), but there's no instant index access.",
    example: "Like a treasure hunt where each clue tells you where the next clue is — you can't jump to clue #5 without following clues 1 through 4 first.",
    code: `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

head = Node(1)
head.next = Node(2)
head.next.next = Node(3)`,
    codeExplain: [
      "Each Node stores a value and a pointer (next) to the following node.",
      "head is the entry point to the whole list.",
      "Building the chain means setting .next on each node in order.",
      "The last node's .next stays None, marking the end of the list.",
    ],
    timeComplexity: "Access O(n), insert/delete at head O(1)", spaceComplexity: "O(n)",
    complexityWhy: "To reach the k-th node you must walk from head, one .next at a time — access is O(n). Inserting at the head just redirects one pointer, no shifting.",
    mistakes: [
      "Losing the reference to the rest of the list by overwriting .next before saving it.",
      "Forgetting to update head when inserting/removing the first node.",
      "Not checking for None before accessing .next, causing an AttributeError.",
    ],
    quiz: { question: "Compared to an array, a linked list's main advantage is:", options: ["O(1) index access", "O(1) insertion/deletion at the head", "Less memory overhead per element", "Guaranteed sorted order"], answerIndex: 1 },
    problems: [
      {
        title: "Find List Length", difficulty: "Easy",
        statement: "Given the head of a linked list, return the number of nodes.",
        exampleInput: "1 -> 2 -> 3 -> None", exampleOutput: "3",
        constraints: "0 <= nodes <= 10^4",
        hints: ["Walk from head, counting each node.", "Stop when you reach None."],
        logic: "Start a counter at 0 and a pointer at head. While the pointer isn't None, increment the counter and move to .next.",
        solution: `def list_length(head):
    count = 0
    node = head
    while node:
        count += 1
        node = node.next
    return count`,
        timeComplexity: "O(n)", spaceComplexity: "O(1)",
      },
      {
        title: "Delete a Node by Value", difficulty: "Medium",
        statement: "Given the head of a linked list and a value, remove the first node with that value.",
        exampleInput: "1 -> 2 -> 3, value=2", exampleOutput: "1 -> 3",
        constraints: "List may become empty.",
        hints: ["Handle the special case where the head itself matches.", "Otherwise track the previous node so you can skip over the matching one."],
        logic: "If head matches, move head forward. Otherwise walk prev/curr pointers; when curr matches, set prev.next = curr.next to unlink it.",
        solution: `def delete_value(head, value):
    if head and head.value == value:
        return head.next
    prev, curr = head, head.next if head else None
    while curr:
        if curr.value == value:
            prev.next = curr.next
            return head
        prev, curr = curr, curr.next
    return head`,
        timeComplexity: "O(n)", spaceComplexity: "O(1)",
      },
    ],
  },
  22: {
    concept: "A stack is Last-In-First-Out (LIFO) — the most recently added item is the first one removed. Python lists work well as stacks using append/pop.",
    example: "Like a stack of plates — you add and remove from the top only. The first plate you put down is the last one you'll pick up.",
    code: `stack = []
stack.append(1)
stack.append(2)
stack.append(3)
print(stack.pop())  # 3 — last in, first out`,
    codeExplain: [
      "append() pushes an item onto the top of the stack.",
      "pop() removes and returns the top item.",
      "Both operations work on the end of the list, which Python does in O(1).",
      "There's no need to shift any other elements.",
    ],
    timeComplexity: "O(1) push/pop", spaceComplexity: "O(n)",
    complexityWhy: "Push and pop only touch the end of the underlying list, so no other elements need to move — each operation is constant time.",
    mistakes: [
      "Using stack.pop(0) — that removes from the front, which is O(n), not a stack operation.",
      "Popping an empty stack without checking, causing an IndexError.",
      "Reaching for recursion when an explicit stack would be clearer for problems like balanced parentheses.",
    ],
    quiz: { question: "A stack follows which ordering principle?", options: ["FIFO", "LIFO", "Sorted order", "Random order"], answerIndex: 1 },
    problems: [
      {
        title: "Valid Parentheses", difficulty: "Easy",
        statement: "Given a string of brackets, determine if every opening bracket has a matching closing bracket in the correct order.",
        exampleInput: '"({[]})"', exampleOutput: "True",
        constraints: "String has only ()[]{} characters.",
        hints: ["Push opening brackets onto a stack.", "When you see a closing bracket, it must match the top of the stack."],
        logic: "Push any opening bracket. On a closing bracket, pop the stack and check it matches — if not, or the stack is empty, it's invalid.",
        solution: `def is_valid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    for ch in s:
        if ch in '([{':
            stack.append(ch)
        else:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack`,
        timeComplexity: "O(n)", spaceComplexity: "O(n)",
      },
      {
        title: "Min Stack", difficulty: "Medium",
        statement: "Design a stack that supports push, pop, top, and retrieving the minimum element, all in O(1).",
        exampleInput: "push(3), push(1), push(2), getMin()", exampleOutput: "1",
        constraints: "All operations must be O(1).",
        hints: ["Use a second stack that tracks the minimum at each level.", "When pushing, also push min(new_value, current_min)."],
        logic: "Keep a parallel min-stack. Every push also pushes the minimum of the new value and the current min, so the top of the min-stack is always the overall minimum.",
        solution: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val):
        self.stack.append(val)
        m = val if not self.min_stack else min(val, self.min_stack[-1])
        self.min_stack.append(m)

    def pop(self):
        self.stack.pop()
        self.min_stack.pop()

    def get_min(self):
        return self.min_stack[-1]`,
        timeComplexity: "O(1) per operation", spaceComplexity: "O(n)",
      },
    ],
  },
  25: {
    concept: "A binary tree is a hierarchical structure where each node has at most two children (left and right). It's the foundation for search trees, heaps, and many recursive algorithms.",
    example: "Like a family tree limited to two children per parent — you explore it by following left/right branches down from the root.",
    code: `class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

root = TreeNode(5)
root.left = TreeNode(3)
root.right = TreeNode(8)`,
    codeExplain: [
      "Each TreeNode holds a value plus pointers to left and right children.",
      "root is the entry point to the whole tree.",
      "Nodes with no children are called leaves.",
      "Trees are naturally processed with recursion — solve for a node using solutions for its children.",
    ],
    timeComplexity: "O(n) to visit every node", spaceComplexity: "O(h), h = tree height",
    complexityWhy: "A full traversal touches every node once (O(n)). The recursion stack depth matches the tree's height — O(log n) balanced, O(n) skewed.",
    mistakes: [
      "Forgetting to check for None before accessing .left or .right.",
      "Confusing tree height with number of nodes.",
      "Not distinguishing a balanced tree from a skewed one when reasoning about complexity.",
    ],
    quiz: { question: "In a balanced binary tree with n nodes, the height is approximately:", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answerIndex: 1 },
    problems: [
      {
        title: "Maximum Depth of Binary Tree", difficulty: "Easy",
        statement: "Given the root of a binary tree, return its maximum depth (longest path from root to a leaf).",
        exampleInput: "tree with root 3, children 9 and 20", exampleOutput: "e.g. 3",
        constraints: "0 <= nodes <= 10^4",
        hints: ["The depth of a node is 1 + the max depth of its children.", "An empty tree (None) has depth 0."],
        logic: "Recursively compute the depth of the left and right subtrees, take the larger one, and add 1 for the current node.",
        solution: `def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
        timeComplexity: "O(n)", spaceComplexity: "O(h)",
      },
      {
        title: "Validate Binary Search Tree", difficulty: "Medium",
        statement: "Determine if a binary tree is a valid BST (left < node < right for every node, recursively).",
        exampleInput: "tree with root 2, left 1, right 3", exampleOutput: "True",
        constraints: "0 <= nodes <= 10^4",
        hints: ["A node's value must fall within a (low, high) range passed down from its ancestors.", "Update the range as you recurse into left/right children."],
        logic: "Going left, the upper bound becomes the parent's value; going right, the lower bound becomes the parent's value. Any node outside its range is invalid.",
        solution: `def is_valid_bst(root, low=float('-inf'), high=float('inf')):
    if not root:
        return True
    if not (low < root.value < high):
        return False
    return (is_valid_bst(root.left, low, root.value) and
            is_valid_bst(root.right, root.value, high))`,
        timeComplexity: "O(n)", spaceComplexity: "O(h)",
      },
    ],
  },
  30: {
    concept: "Breadth-First Search explores a graph level by level, visiting all neighbors of a node before moving further out — using a queue.",
    example: "Like ripples spreading from a stone dropped in water — everyone one step away is reached before anyone two steps away.",
    code: `from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order`,
    codeExplain: [
      "A queue (deque) processes nodes in the order they were discovered — first in, first out.",
      "visited prevents revisiting nodes and infinite loops in cyclic graphs.",
      "Each neighbor is added to the queue once, when first discovered.",
      "The result order reflects level-by-level exploration.",
    ],
    timeComplexity: "O(V + E)", spaceComplexity: "O(V)",
    complexityWhy: "Every vertex is enqueued once and every edge is checked once when exploring neighbors, giving O(V + E).",
    mistakes: [
      "Using a stack instead of a queue — that turns BFS into DFS.",
      "Marking nodes visited only when popped instead of when enqueued, which can enqueue duplicates.",
      "Not handling disconnected graphs if you need to visit every component.",
    ],
    quiz: { question: "BFS uses which data structure to control visit order?", options: ["Stack", "Queue", "Priority Queue", "Linked List"], answerIndex: 1 },
    problems: [
      {
        title: "Shortest Path in Unweighted Graph", difficulty: "Medium",
        statement: "Given a graph and a start node, find the shortest distance (in edges) from start to every other node.",
        exampleInput: "graph={'A':['B','C'],'B':['D'],'C':['D'],'D':[]}, start='A'", exampleOutput: "{'A':0,'B':1,'C':1,'D':2}",
        constraints: "Graph is unweighted, may be cyclic.",
        hints: ["BFS naturally finds shortest paths in unweighted graphs because it explores level by level.", "Track distance alongside each node in the queue."],
        logic: "Start distance[start] = 0. Whenever you discover a new neighbor, its distance is the current node's distance + 1.",
        solution: `from collections import deque
def shortest_paths(graph, start):
    dist = {start: 0}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in dist:
                dist[neighbor] = dist[node] + 1
                queue.append(neighbor)
    return dist`,
        timeComplexity: "O(V + E)", spaceComplexity: "O(V)",
      },
      {
        title: "Number of Islands", difficulty: "Medium",
        statement: "Given a grid of '1's (land) and '0's (water), count the number of islands (connected groups of land).",
        exampleInput: "grid with a few connected 1 clusters", exampleOutput: "e.g. 3",
        constraints: "Grid up to 300x300.",
        hints: ["BFS/flood-fill from every unvisited land cell.", "Mark cells visited as you enqueue them to avoid recounting."],
        logic: "Scan every cell; on an unvisited '1', run BFS to mark its whole connected island visited, incrementing the island count once per run.",
        solution: `from collections import deque
def num_islands(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    visited = set()
    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1' and (r, c) not in visited:
                count += 1
                queue = deque([(r, c)])
                visited.add((r, c))
                while queue:
                    cr, cc = queue.popleft()
                    for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                        nr, nc = cr+dr, cc+dc
                        if (0<=nr<rows and 0<=nc<cols and grid[nr][nc]=='1' and (nr,nc) not in visited):
                            visited.add((nr, nc))
                            queue.append((nr, nc))
    return count`,
        timeComplexity: "O(rows * cols)", spaceComplexity: "O(rows * cols)",
      },
    ],
  },
  35: {
    concept: "Dynamic Programming solves problems by breaking them into overlapping subproblems, solving each once, and reusing results (memoization or tabulation) instead of recomputing.",
    example: "Like keeping a notebook of answers to sub-questions you've already solved during an exam, instead of redoing the same calculation every time it comes up.",
    code: `def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]`,
    codeExplain: [
      "memo stores results of subproblems already solved, keyed by n.",
      "Before recomputing, check if the answer is already cached.",
      "This turns exponential naive recursion (O(2^n)) into linear time (O(n)).",
      "Each unique n is computed exactly once.",
    ],
    timeComplexity: "O(n) with memoization", spaceComplexity: "O(n)",
    complexityWhy: "Without memoization, the same subproblems get recomputed many times, causing exponential blowup. Caching means every unique subproblem is solved once.",
    mistakes: [
      "Not identifying the overlapping subproblems, missing the chance to memoize.",
      "Confusing memoization (top-down) with tabulation (bottom-up) — both are valid DP strategies.",
      "Not defining the base cases clearly before writing the recurrence.",
    ],
    quiz: { question: "The main idea behind Dynamic Programming is:", options: ["Always use recursion", "Cache and reuse solutions to overlapping subproblems", "Sort the input first", "Use a stack instead of a queue"], answerIndex: 1 },
    problems: [
      {
        title: "Climbing Stairs", difficulty: "Easy",
        statement: "You can climb 1 or 2 steps at a time. Given n stairs, how many distinct ways can you reach the top?",
        exampleInput: "n=4", exampleOutput: "5",
        constraints: "1 <= n <= 45",
        hints: ["Ways to reach step n = ways to reach n-1 + ways to reach n-2.", "This is the same recurrence as Fibonacci."],
        logic: "ways(n) = ways(n-1) + ways(n-2), because your last move was either a 1-step from n-1 or a 2-step from n-2.",
        solution: `def climb_stairs(n):
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b`,
        timeComplexity: "O(n)", spaceComplexity: "O(1)",
      },
      {
        title: "House Robber", difficulty: "Medium",
        statement: "Given houses with money amounts, find the max money you can rob without robbing two adjacent houses.",
        exampleInput: "[2,7,9,3,1]", exampleOutput: "12",
        constraints: "1 <= len(nums) <= 100",
        hints: ["At each house: skip it (keep previous best) or rob it (previous-previous best + current value).", "Track just the last two best values instead of a full array."],
        logic: "best(i) = max(best(i-1), best(i-2) + nums[i]) — either skip house i, or rob it and add to the best result through i-2.",
        solution: `def rob(nums):
    prev, curr = 0, 0
    for n in nums:
        prev, curr = curr, max(curr, prev + n)
    return curr`,
        timeComplexity: "O(n)", spaceComplexity: "O(1)",
      },
    ],
  },
};

function makeStub(day, phaseName, title) {
  return {
    concept: `${title} is a core pattern in the ${phaseName} phase. Focus on recognizing when it applies and how it changes your approach compared to a brute-force solution.`,
    example: `Once you can spot "${title}" in a problem statement, you'll notice the pattern shows up far more often than it first appears.`,
    code: null,
    codeExplain: [],
    timeComplexity: "Varies — compute it for each solution", spaceComplexity: "Varies — compute it for each solution",
    complexityWhy: "Complexity depends on the specific approach you choose. Practice identifying loops, recursion depth, and extra data structures to reason about it yourself.",
    mistakes: ["Jumping to code before explaining the approach out loud.", "Not checking edge cases like empty input or a single element."],
    quiz: { question: `True or False: mastering "${title}" means memorizing one exact solution rather than understanding the underlying pattern.`, options: ["True", "False"], answerIndex: 1 },
    problems: [{
      title: `Warm-up: ${title}`, difficulty: "Easy",
      statement: `Write a short Python function that demonstrates your understanding of ${title.toLowerCase()}. Keep it simple — the goal is applying the concept, not writing perfect code.`,
      exampleInput: "Varies by your approach", exampleOutput: "Varies by your approach",
      constraints: "Keep your solution under 15 lines.",
      hints: ["Re-read the concept above and restate it in your own words first.", "Sketch the approach in comments before writing any code."],
      logic: "Break the problem into the smallest possible version, solve that by hand, then translate your reasoning into code.",
      solution: "# Try it yourself first.\n# This lesson's solution is intentionally left for you\n# to write and self-check against the hints above.",
      timeComplexity: "Depends on your approach", spaceComplexity: "Depends on your approach",
    }],
    stub: true,
  };
}

const LESSONS = TITLES.map((title, i) => {
  const day = i + 1;
  const phase = phaseForDay(day);
  const base = FLAGSHIP[day] ? FLAGSHIP[day] : makeStub(day, phase.name, title);
  return { day, title, phaseId: phase.id, phaseName: phase.name, ...base };
});

const TOTAL_PROBLEMS = LESSONS.reduce((s, l) => s + l.problems.length, 0);

const DIFF_COLOR = { Easy: "#4DD8C5", Medium: "#F5B942", Hard: "#FF5A36" };

const BADGES = [
  { id: "first_lesson", label: "First Steps", icon: Star, desc: "Complete your first lesson", check: p => p.completedLessons.length >= 1 },
  { id: "first_problem", label: "Problem Solver", icon: Target, desc: "Solve your first problem", check: p => Object.keys(p.solvedProblems).length >= 1 },
  { id: "streak_7", label: "7 Day Streak", icon: Flame, desc: "Keep a 7 day streak", check: p => p.streak >= 7 },
  { id: "foundations", label: "Foundations Master", icon: Award, desc: "Finish Phase 1: Foundations", check: p => [1,2,3,4,5].every(d => p.completedLessons.includes(d)) },
  { id: "century", label: "Century Club", icon: Trophy, desc: "Solve 100 problems", check: p => Object.keys(p.solvedProblems).length >= 100 },
  { id: "master", label: "DSA Master", icon: Trophy, desc: "Complete the full 40-day roadmap", check: p => p.completedLessons.length >= 40 },
];

/* ============================== STYLES ============================== */

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

      .df-root {
        --bg: #14161A;
        --surface: #1D2026;
        --surface-alt: #262A32;
        --border: #33383F;
        --text: #ECEAE5;
        --text-dim: #9198A3;
        --ember: #FF5A36;
        --ember-dim: #E14A2A;
        --cyan: #4DD8C5;
        --amber: #F5B942;
        font-family: 'Inter', system-ui, sans-serif;
        background: var(--bg);
        color: var(--text);
      }
      .df-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
      .df-mono { font-family: 'JetBrains Mono', 'Courier New', monospace; }

      .df-card {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 14px;
      }
      .df-card-alt {
        background: var(--surface-alt);
        border: 1px solid var(--border);
        border-radius: 14px;
      }
      .df-forge-track {
        background: #0F1013;
        border: 1px solid var(--border);
        border-radius: 999px;
        overflow: hidden;
      }
      .df-forge-fill {
        background: linear-gradient(90deg, #7A2E1B 0%, var(--ember) 55%, #FF9466 100%);
        height: 100%;
        border-radius: 999px;
        transition: width 0.6s cubic-bezier(.4,0,.2,1);
      }
      .df-btn-primary {
        background: var(--ember);
        color: #14161A;
        font-weight: 600;
        border-radius: 10px;
        transition: transform 0.15s ease, background 0.15s ease;
      }
      .df-btn-primary:hover { background: #FF6E4D; transform: translateY(-1px); }
      .df-btn-primary:disabled { opacity: 0.4; transform: none; cursor: not-allowed; }
      .df-btn-secondary {
        background: var(--surface-alt);
        border: 1px solid var(--border);
        color: var(--text);
        border-radius: 10px;
        transition: border-color 0.15s ease;
      }
      .df-btn-secondary:hover { border-color: var(--ember); }
      .df-nav-item { color: var(--text-dim); transition: color 0.15s ease; }
      .df-nav-item.active { color: var(--ember); }
      .df-code {
        background: #0F1013;
        border: 1px solid var(--border);
        border-radius: 10px;
      }
      @media (prefers-reduced-motion: reduce) {
        .df-forge-fill, .df-btn-primary, .df-btn-secondary { transition: none !important; }
      }
      ::selection { background: var(--ember); color: #14161A; }
    `}</style>
  );
}

/* ============================== PERSISTENCE ============================== */

const DEFAULT_PROGRESS = {
  completedLessons: [],
  solvedProblems: {},
  xp: 0,
  streak: 0,
  lastActiveDate: null,
  notes: {},
  bookmarks: [],
};

function useProgress() {
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await window.storage.get("dsa-forge-progress", false);
        if (!cancelled && res && res.value) {
          setProgress({ ...DEFAULT_PROGRESS, ...JSON.parse(res.value) });
        }
      } catch (e) {
        /* no saved progress yet */
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.storage.set("dsa-forge-progress", JSON.stringify(progress), false).catch(() => {});
  }, [progress, loaded]);

  return [progress, setProgress, loaded];
}

/* ============================== HELPERS ============================== */

function todayStr() { return new Date().toDateString(); }
function yesterdayStr() {
  const d = new Date(); d.setDate(d.getDate() - 1); return d.toDateString();
}
function nextUnlockedDay(progress) {
  for (let d = 1; d <= 40; d++) {
    if (!progress.completedLessons.includes(d)) return d;
  }
  return 40;
}
function isUnlocked(day, progress) {
  return day === 1 || progress.completedLessons.includes(day - 1) || progress.completedLessons.includes(day);
}
function levelFromXp(xp) { return Math.floor(xp / 500) + 1; }

/* ============================== UI PIECES ============================== */

function ForgeBar({ value, height = 10 }) {
  return (
    <div className="df-forge-track w-full" style={{ height }}>
      <div className="df-forge-fill" style={{ width: `${Math.max(2, Math.min(100, value))}%` }} />
    </div>
  );
}

function DiffBadge({ diff }) {
  return (
    <span
      className="df-mono text-xs px-2 py-0.5 rounded-full border"
      style={{ color: DIFF_COLOR[diff], borderColor: DIFF_COLOR[diff] + "55", background: DIFF_COLOR[diff] + "14" }}
    >
      {diff}
    </span>
  );
}

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "roadmap", label: "Roadmap", icon: MapIcon },
  { id: "practice", label: "Practice", icon: Code2 },
  { id: "progress", label: "Progress", icon: TrendingUp },
  { id: "profile", label: "Profile", icon: User },
];

function Nav({ view, setView }) {
  return (
    <nav
      className="fixed bottom-0 left-0 w-full flex md:flex-col md:top-0 md:h-screen md:w-56 md:justify-start justify-around
                 border-t md:border-t-0 md:border-r z-30"
      style={{ background: "#181B20", borderColor: "var(--border)" }}
    >
      <div className="hidden md:flex items-center gap-2 px-5 py-6">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--ember)" }}>
          <Terminal size={18} color="#14161A" />
        </div>
        <div>
          <div className="df-display font-semibold text-sm leading-none">DSA Forge</div>
          <div className="text-[10px] text-dim df-mono" style={{ color: "var(--text-dim)" }}>Understand. Code. Solve.</div>
        </div>
      </div>
      {NAV_ITEMS.map(item => {
        const Icon = item.icon;
        const active = view === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`df-nav-item ${active ? "active" : ""} flex flex-col md:flex-row items-center gap-0.5 md:gap-3
                        py-2 md:py-3 px-3 md:px-5 flex-1 md:flex-none md:w-full`}
          >
            <Icon size={20} strokeWidth={active ? 2.4 : 2} />
            <span className="text-[10px] md:text-sm font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function TopBar({ progress }) {
  const level = levelFromXp(progress.xp);
  return (
    <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-5 sticky top-0 z-20"
         style={{ background: "rgba(20,22,26,0.92)", backdropFilter: "blur(6px)", borderBottom: "1px solid var(--border)" }}>
      <div className="flex items-center gap-2 md:hidden">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--ember)" }}>
          <Terminal size={15} color="#14161A" />
        </div>
        <span className="df-display font-semibold">DSA Forge</span>
      </div>
      <div className="hidden md:block df-display font-semibold text-lg">Welcome back</div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 df-mono text-sm px-2.5 py-1 rounded-full" style={{ background: "var(--surface-alt)", border: "1px solid var(--border)" }}>
          <Flame size={14} color="var(--ember)" />
          <span>{progress.streak}</span>
        </div>
        <div className="flex items-center gap-1 df-mono text-sm px-2.5 py-1 rounded-full" style={{ background: "var(--surface-alt)", border: "1px solid var(--border)" }}>
          <Zap size={14} color="var(--amber)" />
          <span>Lv {level}</span>
        </div>
      </div>
    </div>
  );
}

/* ============================== HOME ============================== */

function HomeView({ progress, setView, openLesson }) {
  const nextDay = nextUnlockedDay(progress);
  const nextLesson = LESSONS[nextDay - 1];
  const overallPct = Math.round((progress.completedLessons.length / 40) * 100);
  const solvedCount = Object.keys(progress.solvedProblems).length;
  const todayDone = progress.completedLessons.includes(nextDay - 1) === false && progress.completedLessons.includes(nextDay);

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-0 pb-6 pt-4 space-y-5">
      <div>
        <h1 className="df-display text-2xl font-semibold">Forge your DSA skills, one day at a time.</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-dim)" }}>
          {progress.completedLessons.includes(nextDay)
            ? "Great job! Today's lesson is complete 🎉"
            : `Day ${nextDay} — ${nextLesson.title}`}
        </p>
      </div>

      <div className="df-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="df-mono text-sm" style={{ color: "var(--ember)" }}>{overallPct}%</span>
        </div>
        <ForgeBar value={overallPct} />
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div>
            <div className="df-display text-xl font-semibold">{progress.completedLessons.length}<span className="text-sm" style={{ color: "var(--text-dim)" }}>/40</span></div>
            <div className="text-xs" style={{ color: "var(--text-dim)" }}>Lessons</div>
          </div>
          <div>
            <div className="df-display text-xl font-semibold">{solvedCount}<span className="text-sm" style={{ color: "var(--text-dim)" }}>/{TOTAL_PROBLEMS}</span></div>
            <div className="text-xs" style={{ color: "var(--text-dim)" }}>Problems</div>
          </div>
          <div>
            <div className="df-display text-xl font-semibold flex items-center gap-1"><Flame size={16} color="var(--ember)" />{progress.streak}</div>
            <div className="text-xs" style={{ color: "var(--text-dim)" }}>Day streak</div>
          </div>
        </div>
      </div>

      <button
        onClick={() => openLesson(nextDay)}
        className="df-btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-base"
      >
        <Play size={18} />
        Continue Learning
      </button>

      <div className="grid grid-cols-3 gap-3">
        <button onClick={() => setView("roadmap")} className="df-btn-secondary py-3 flex flex-col items-center gap-1">
          <MapIcon size={18} /><span className="text-xs">Roadmap</span>
        </button>
        <button onClick={() => setView("practice")} className="df-btn-secondary py-3 flex flex-col items-center gap-1">
          <Code2 size={18} /><span className="text-xs">Practice</span>
        </button>
        <button onClick={() => setView("progress")} className="df-btn-secondary py-3 flex flex-col items-center gap-1">
          <TrendingUp size={18} /><span className="text-xs">Progress</span>
        </button>
      </div>

      {nextDay < 40 && (
        <div className="df-card-alt p-4 flex items-center justify-between">
          <div>
            <div className="text-xs" style={{ color: "var(--text-dim)" }}>Tomorrow's topic</div>
            <div className="font-medium text-sm">{LESSONS[nextDay]?.title ?? "—"}</div>
          </div>
          <ChevronRight size={18} color="var(--text-dim)" />
        </div>
      )}
    </div>
  );
}

/* ============================== ROADMAP ============================== */

function RoadmapView({ progress, openLesson }) {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-0 pb-6 pt-4 space-y-6">
      <h1 className="df-display text-2xl font-semibold">40-Day Roadmap</h1>
      {PHASES.map(phase => {
        const days = LESSONS.filter(l => l.phaseId === phase.id);
        const doneCount = days.filter(l => progress.completedLessons.includes(l.day)).length;
        return (
          <div key={phase.id}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold" style={{ color: "var(--text-dim)" }}>
                Phase {phase.id} · {phase.name}
              </h2>
              <span className="df-mono text-xs" style={{ color: "var(--text-dim)" }}>{doneCount}/{days.length}</span>
            </div>
            <div className="space-y-2">
              {days.map(l => {
                const done = progress.completedLessons.includes(l.day);
                const unlocked = isUnlocked(l.day, progress);
                return (
                  <button
                    key={l.day}
                    disabled={!unlocked}
                    onClick={() => openLesson(l.day)}
                    className="df-card w-full flex items-center gap-3 px-4 py-3 text-left disabled:opacity-40"
                  >
                    <div
                      className="df-mono text-xs w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: done ? "var(--ember)" : "var(--surface-alt)",
                        color: done ? "#14161A" : "var(--text-dim)",
                      }}
                    >
                      {done ? <CheckCircle2 size={16} /> : unlocked ? l.day : <Lock size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">Day {l.day}: {l.title}</div>
                    </div>
                    {unlocked && <ChevronRight size={16} color="var(--text-dim)" />}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================== PRACTICE (LIST) ============================== */

function PracticeListView({ progress, openLesson }) {
  const unlockedLessons = LESSONS.filter(l => isUnlocked(l.day, progress));
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-0 pb-6 pt-4 space-y-4">
      <h1 className="df-display text-2xl font-semibold">Practice</h1>
      <p className="text-sm" style={{ color: "var(--text-dim)" }}>Jump into problems from any unlocked lesson. Solve to earn XP.</p>
      <div className="space-y-2">
        {unlockedLessons.map(l => {
          const solvedInLesson = l.problems.filter((_, idx) => progress.solvedProblems[`${l.day}-${idx}`]).length;
          return (
            <button key={l.day} onClick={() => openLesson(l.day, "practice")} className="df-card w-full flex items-center justify-between px-4 py-3 text-left">
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">Day {l.day}: {l.title}</div>
                <div className="text-xs" style={{ color: "var(--text-dim)" }}>{solvedInLesson}/{l.problems.length} solved</div>
              </div>
              <ChevronRight size={16} color="var(--text-dim)" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============================== LESSON VIEW ============================== */

function LessonView({ day, progress, setProgress, onBack, initialTab }) {
  const lesson = LESSONS[day - 1];
  const [tab, setTab] = useState(initialTab || "learn");
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [noteDraft, setNoteDraft] = useState(progress.notes[day] || "");

  useEffect(() => {
    setTab(initialTab || "learn");
    setQuizSelected(null);
    setQuizChecked(false);
    setNoteDraft(progress.notes[day] || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);

  const completed = progress.completedLessons.includes(day);
  const bookmarked = progress.bookmarks.includes(day);
  const quizCorrect = quizChecked && quizSelected === lesson.quiz.answerIndex;

  const toggleBookmark = () => {
    setProgress(p => ({
      ...p,
      bookmarks: p.bookmarks.includes(day) ? p.bookmarks.filter(d => d !== day) : [...p.bookmarks, day],
    }));
  };

  const saveNote = () => {
    setProgress(p => ({ ...p, notes: { ...p.notes, [day]: noteDraft } }));
  };

  const markComplete = () => {
    if (completed) return;
    setProgress(p => {
      const today = todayStr();
      let streak = p.streak;
      if (p.lastActiveDate === today) {
        streak = p.streak || 1;
      } else if (p.lastActiveDate === yesterdayStr()) {
        streak = p.streak + 1;
      } else {
        streak = 1;
      }
      return {
        ...p,
        completedLessons: [...p.completedLessons, day],
        xp: p.xp + 50,
        streak,
        lastActiveDate: today,
      };
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-0 pb-24 pt-4">
      <div className="flex items-center justify-between mb-3">
        <button onClick={onBack} className="flex items-center gap-1 text-sm" style={{ color: "var(--text-dim)" }}>
          <ArrowLeft size={16} /> Back
        </button>
        <button onClick={toggleBookmark}>
          <Bookmark size={20} color={bookmarked ? "var(--ember)" : "var(--text-dim)"} fill={bookmarked ? "var(--ember)" : "none"} />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-1">
        <span className="df-mono text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--surface-alt)", color: "var(--text-dim)" }}>Day {day}</span>
        {completed && (
          <span className="df-mono text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: "#4DD8C522", color: "var(--cyan)" }}>
            <CheckCircle2 size={12} /> Completed
          </span>
        )}
      </div>
      <h1 className="df-display text-2xl font-semibold mb-4">{lesson.title}</h1>

      <div className="flex gap-1 mb-4 df-card-alt p-1">
        {["learn", "quiz", "practice"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2 rounded-lg text-sm font-medium capitalize"
            style={{ background: tab === t ? "var(--ember)" : "transparent", color: tab === t ? "#14161A" : "var(--text-dim)" }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "learn" && (
        <div className="space-y-5">
          <Section title="Concept">
            <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>{lesson.concept}</p>
          </Section>
          <Section title="Real-World Example">
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>{lesson.example}</p>
          </Section>
          {lesson.code && (
            <Section title="Python Implementation">
              <pre className="df-code df-mono text-xs p-4 overflow-x-auto"><code>{lesson.code}</code></pre>
            </Section>
          )}
          {lesson.codeExplain.length > 0 && (
            <Section title="Line-by-Line">
              <ul className="space-y-1.5">
                {lesson.codeExplain.map((line, i) => (
                  <li key={i} className="text-sm flex gap-2" style={{ color: "var(--text-dim)" }}>
                    <span style={{ color: "var(--ember)" }}>▸</span> {line}
                  </li>
                ))}
              </ul>
            </Section>
          )}
          <Section title="Complexity">
            <div className="flex gap-3 mb-2">
              <span className="df-mono text-xs px-2.5 py-1 rounded-lg" style={{ background: "var(--surface-alt)", color: "var(--cyan)" }}>Time: {lesson.timeComplexity}</span>
              <span className="df-mono text-xs px-2.5 py-1 rounded-lg" style={{ background: "var(--surface-alt)", color: "var(--amber)" }}>Space: {lesson.spaceComplexity}</span>
            </div>
            <p className="text-sm" style={{ color: "var(--text-dim)" }}>{lesson.complexityWhy}</p>
          </Section>
          <Section title="Common Mistakes">
            <ul className="space-y-1.5">
              {lesson.mistakes.map((m, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: "var(--text-dim)" }}>
                  <X size={14} color="var(--ember)" className="shrink-0 mt-0.5" /> {m}
                </li>
              ))}
            </ul>
          </Section>
          <Section title="My Notes">
            <textarea
              value={noteDraft}
              onChange={e => setNoteDraft(e.target.value)}
              onBlur={saveNote}
              placeholder="Write anything you want to remember about this topic..."
              className="w-full text-sm p-3 rounded-lg df-mono"
              style={{ background: "var(--surface-alt)", border: "1px solid var(--border)", color: "var(--text)", minHeight: 80 }}
            />
          </Section>
        </div>
      )}

      {tab === "quiz" && (
        <div className="df-card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb size={16} color="var(--amber)" />
            <span className="text-sm font-medium">Quick Quiz</span>
          </div>
          <p className="text-sm">{lesson.quiz.question}</p>
          <div className="space-y-2">
            {lesson.quiz.options.map((opt, i) => {
              const isSelected = quizSelected === i;
              const showResult = quizChecked;
              let borderColor = "var(--border)";
              if (showResult && i === lesson.quiz.answerIndex) borderColor = "var(--cyan)";
              else if (showResult && isSelected) borderColor = "var(--ember)";
              else if (isSelected) borderColor = "var(--ember)";
              return (
                <button
                  key={i}
                  onClick={() => { setQuizSelected(i); setQuizChecked(false); }}
                  className="w-full text-left text-sm px-4 py-2.5 rounded-lg df-card-alt"
                  style={{ borderColor }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {!quizChecked ? (
            <button
              disabled={quizSelected === null}
              onClick={() => setQuizChecked(true)}
              className="df-btn-primary w-full py-2.5"
            >
              Check Answer
            </button>
          ) : (
            <div className="text-sm font-medium" style={{ color: quizCorrect ? "var(--cyan)" : "var(--ember)" }}>
              {quizCorrect ? "Correct! You've got it." : "Not quite — review the concept and try again."}
            </div>
          )}
        </div>
      )}

      {tab === "practice" && (
        <div className="space-y-4">
          {lesson.problems.map((prob, idx) => (
            <ProblemCard key={idx} day={day} idx={idx} prob={prob} progress={progress} setProgress={setProgress} />
          ))}
        </div>
      )}

      <div className="mt-6 sticky bottom-20 md:bottom-4">
        <button
          onClick={markComplete}
          disabled={completed}
          className="df-btn-primary w-full py-3.5 flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={18} />
          {completed ? "Lesson Completed ✓" : "Mark Lesson Complete"}
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="df-display text-sm font-semibold mb-2" style={{ color: "var(--ember)" }}>{title}</h3>
      {children}
    </div>
  );
}

function ProblemCard({ day, idx, prob, progress, setProgress }) {
  const key = `${day}-${idx}`;
  const solved = !!progress.solvedProblems[key];
  const [hintLevel, setHintLevel] = useState(0); // 0 none, 1 hint1, 2 hint2, 3 logic
  const [showSolution, setShowSolution] = useState(false);
  const [code, setCode] = useState("");
  const [ran, setRan] = useState(false);

  const markSolved = () => {
    if (solved) return;
    setProgress(p => ({
      ...p,
      solvedProblems: { ...p.solvedProblems, [key]: prob.difficulty },
      xp: p.xp + (prob.difficulty === "Hard" ? 40 : prob.difficulty === "Medium" ? 20 : 10),
    }));
  };

  return (
    <div className="df-card p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-medium text-sm">{prob.title}</h4>
        <div className="flex items-center gap-2 shrink-0">
          <DiffBadge diff={prob.difficulty} />
          {solved && <CheckCircle2 size={16} color="var(--cyan)" />}
        </div>
      </div>
      <p className="text-sm" style={{ color: "var(--text-dim)" }}>{prob.statement}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs df-mono">
        <div className="df-code p-2"><span style={{ color: "var(--text-dim)" }}>Input: </span>{prob.exampleInput}</div>
        <div className="df-code p-2"><span style={{ color: "var(--text-dim)" }}>Output: </span>{prob.exampleOutput}</div>
      </div>
      <p className="text-xs" style={{ color: "var(--text-dim)" }}>Constraints: {prob.constraints}</p>

      <textarea
        value={code}
        onChange={e => { setCode(e.target.value); setRan(false); }}
        placeholder="# Write your Python solution here"
        className="w-full df-code df-mono text-xs p-3"
        style={{ minHeight: 90, color: "var(--text)" }}
        spellCheck={false}
      />
      <div className="flex gap-2">
        <button onClick={() => setRan(true)} className="df-btn-secondary flex-1 py-2 text-sm flex items-center justify-center gap-1">
          <Play size={14} /> Run
        </button>
        <button onClick={() => setCode("")} className="df-btn-secondary flex-1 py-2 text-sm flex items-center justify-center gap-1">
          <RotateCcw size={14} /> Clear
        </button>
      </div>
      {ran && (
        <div className="df-code p-3 text-xs df-mono" style={{ color: "var(--text-dim)" }}>
          Simulated environment — live Python execution is coming soon. Trace through the test cases above by hand, then compare your logic to the hints or solution below.
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-1">
        {hintLevel < 1 && (
          <button onClick={() => setHintLevel(1)} className="df-btn-secondary px-3 py-1.5 text-xs flex items-center gap-1">
            <Lightbulb size={13} /> Hint 1
          </button>
        )}
        {hintLevel >= 1 && hintLevel < 2 && (
          <button onClick={() => setHintLevel(2)} className="df-btn-secondary px-3 py-1.5 text-xs flex items-center gap-1">
            <Lightbulb size={13} /> Hint 2
          </button>
        )}
        {hintLevel >= 2 && hintLevel < 3 && (
          <button onClick={() => setHintLevel(3)} className="df-btn-secondary px-3 py-1.5 text-xs flex items-center gap-1">
            <Lightbulb size={13} /> Show Logic
          </button>
        )}
        {hintLevel >= 3 && !showSolution && (
          <button onClick={() => setShowSolution(true)} className="df-btn-secondary px-3 py-1.5 text-xs flex items-center gap-1">
            <Eye size={13} /> Show Solution
          </button>
        )}
      </div>

      {hintLevel >= 1 && <p className="text-xs" style={{ color: "var(--amber)" }}>💡 {prob.hints[0]}</p>}
      {hintLevel >= 2 && <p className="text-xs" style={{ color: "var(--amber)" }}>💡 {prob.hints[1]}</p>}
      {hintLevel >= 3 && <p className="text-xs" style={{ color: "var(--cyan)" }}>🧭 Logic: {prob.logic}</p>}
      {showSolution && (
        <div className="space-y-2 pt-1">
          <pre className="df-code df-mono text-xs p-3 overflow-x-auto"><code>{prob.solution}</code></pre>
          <div className="flex gap-3 text-xs df-mono" style={{ color: "var(--text-dim)" }}>
            <span>Time: {prob.timeComplexity}</span>
            <span>Space: {prob.spaceComplexity}</span>
          </div>
        </div>
      )}

      <button
        onClick={markSolved}
        disabled={solved}
        className="df-btn-primary w-full py-2 text-sm"
      >
        {solved ? "Solved ✓" : "I Solved It"}
      </button>
    </div>
  );
}

/* ============================== PROGRESS VIEW ============================== */

function ProgressView({ progress }) {
  const solvedByDiff = { Easy: 0, Medium: 0, Hard: 0 };
  Object.values(progress.solvedProblems).forEach(d => { solvedByDiff[d] = (solvedByDiff[d] || 0) + 1; });
  const totalSolved = Object.keys(progress.solvedProblems).length;

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-0 pb-6 pt-4 space-y-5">
      <h1 className="df-display text-2xl font-semibold">Your Progress</h1>

      <div className="grid grid-cols-2 gap-3">
        <div className="df-card p-4">
          <div className="df-display text-2xl font-semibold">{progress.completedLessons.length}/40</div>
          <div className="text-xs" style={{ color: "var(--text-dim)" }}>Lessons completed</div>
        </div>
        <div className="df-card p-4">
          <div className="df-display text-2xl font-semibold">{totalSolved}/{TOTAL_PROBLEMS}</div>
          <div className="text-xs" style={{ color: "var(--text-dim)" }}>Problems solved</div>
        </div>
        <div className="df-card p-4">
          <div className="df-display text-2xl font-semibold flex items-center gap-1"><Flame size={18} color="var(--ember)" />{progress.streak}</div>
          <div className="text-xs" style={{ color: "var(--text-dim)" }}>Day streak</div>
        </div>
        <div className="df-card p-4">
          <div className="df-display text-2xl font-semibold">{progress.xp} XP</div>
          <div className="text-xs" style={{ color: "var(--text-dim)" }}>Level {levelFromXp(progress.xp)}</div>
        </div>
      </div>

      <div className="df-card p-5">
        <h3 className="text-sm font-semibold mb-3">Problems by Difficulty</h3>
        {["Easy", "Medium", "Hard"].map(d => (
          <div key={d} className="mb-3 last:mb-0">
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: DIFF_COLOR[d] }}>{d}</span>
              <span className="df-mono" style={{ color: "var(--text-dim)" }}>{solvedByDiff[d] || 0}</span>
            </div>
            <div className="df-forge-track" style={{ height: 8 }}>
              <div style={{ width: `${Math.min(100, ((solvedByDiff[d] || 0) / Math.max(1, totalSolved)) * 100)}%`, height: "100%", background: DIFF_COLOR[d], borderRadius: 999 }} />
            </div>
          </div>
        ))}
      </div>

      <div className="df-card p-5">
        <h3 className="text-sm font-semibold mb-3">Phase Progress</h3>
        <div className="space-y-3">
          {PHASES.map(phase => {
            const days = LESSONS.filter(l => l.phaseId === phase.id);
            const done = days.filter(l => progress.completedLessons.includes(l.day)).length;
            return (
              <div key={phase.id}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{phase.name}</span>
                  <span className="df-mono" style={{ color: "var(--text-dim)" }}>{done}/{days.length}</span>
                </div>
                <ForgeBar value={(done / days.length) * 100} height={6} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="df-card p-5">
        <h3 className="text-sm font-semibold mb-3">Badges</h3>
        <div className="grid grid-cols-3 gap-3">
          {BADGES.map(b => {
            const earned = b.check(progress);
            const Icon = b.icon;
            return (
              <div key={b.id} className="flex flex-col items-center text-center gap-1 p-2 rounded-lg" style={{ opacity: earned ? 1 : 0.35 }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: earned ? "var(--ember)" : "var(--surface-alt)" }}>
                  <Icon size={18} color={earned ? "#14161A" : "var(--text-dim)"} />
                </div>
                <span className="text-[10px] font-medium leading-tight">{b.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================== PROFILE VIEW ============================== */

function ProfileView({ progress, setProgress }) {
  const [confirmReset, setConfirmReset] = useState(false);
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-0 pb-6 pt-4 space-y-5">
      <h1 className="df-display text-2xl font-semibold">Profile</h1>
      <div className="df-card p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center df-display font-semibold text-lg" style={{ background: "var(--ember)", color: "#14161A" }}>
          {levelFromXp(progress.xp)}
        </div>
        <div>
          <div className="font-medium">Level {levelFromXp(progress.xp)} Learner</div>
          <div className="text-xs" style={{ color: "var(--text-dim)" }}>{progress.xp} XP earned</div>
        </div>
      </div>

      <div className="df-card p-5">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Bookmark size={14} /> Bookmarks</h3>
        {progress.bookmarks.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-dim)" }}>No bookmarks yet. Tap the bookmark icon on any lesson to save it here.</p>
        ) : (
          <div className="space-y-1">
            {progress.bookmarks.map(d => (
              <div key={d} className="text-sm flex items-center gap-2">
                <span className="df-mono text-xs" style={{ color: "var(--text-dim)" }}>Day {d}</span> {LESSONS[d - 1].title}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="df-card p-5">
        <h3 className="text-sm font-semibold mb-2">Reset Progress</h3>
        <p className="text-xs mb-3" style={{ color: "var(--text-dim)" }}>This clears all lessons, problems, streaks, and notes. This can't be undone.</p>
        {!confirmReset ? (
          <button onClick={() => setConfirmReset(true)} className="df-btn-secondary w-full py-2 text-sm" style={{ color: "var(--ember)" }}>
            Reset all progress
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => { setProgress(DEFAULT_PROGRESS); setConfirmReset(false); }}
              className="df-btn-primary flex-1 py-2 text-sm"
            >
              Confirm reset
            </button>
            <button onClick={() => setConfirmReset(false)} className="df-btn-secondary flex-1 py-2 text-sm">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================== APP ============================== */

export default function App() {
  const [progress, setProgress, loaded] = useProgress();
  const [view, setView] = useState("home");
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonTab, setLessonTab] = useState("learn");

  const openLesson = useCallback((day, tab) => {
    setActiveLesson(day);
    setLessonTab(tab || "learn");
  }, []);

  if (!loaded) {
    return (
      <div className="df-root min-h-screen flex items-center justify-center">
        <GlobalStyle />
        <div className="flex items-center gap-2 df-mono text-sm" style={{ color: "var(--text-dim)" }}>
          <Terminal size={16} color="var(--ember)" /> Loading DSA Forge…
        </div>
      </div>
    );
  }

  return (
    <div className="df-root min-h-screen md:flex">
      <GlobalStyle />
      <Nav view={view} setView={(v) => { setActiveLesson(null); setView(v); }} />
      <div className="flex-1 md:ml-56 pb-16 md:pb-0">
        <TopBar progress={progress} />
        {activeLesson ? (
          <LessonView
            day={activeLesson}
            progress={progress}
            setProgress={setProgress}
            onBack={() => setActiveLesson(null)}
            initialTab={lessonTab}
          />
        ) : view === "home" ? (
          <HomeView progress={progress} setView={setView} openLesson={openLesson} />
        ) : view === "roadmap" ? (
          <RoadmapView progress={progress} openLesson={openLesson} />
        ) : view === "practice" ? (
          <PracticeListView progress={progress} openLesson={openLesson} />
        ) : view === "progress" ? (
          <ProgressView progress={progress} />
        ) : (
          <ProfileView progress={progress} setProgress={setProgress} />
        )}
      </div>
    </div>
  );
}
