# DFS.py
class Node: # Define a class to represent each node in the tree
    def __init__(self, data):
        self.data = data # Store the node's value
        self.left = None # Left child of the node
        self.right = None # Right child of the node

# Create the tree based on the given structure
root = Node(8) # Root node is 8
root.left = Node(3) # 3 is the left child of 8
root.right = Node(10) # 10 is the right child of 8

root.left.left = Node(1) # 1 is the left child of 3
root.left.right = Node(6) # 6 is the right child of 3

root.left.right.left = Node(4) # 4 is the left child of 6
root.left.right.right = Node(7) # 7 is the right child of 6

root.right.right = Node(14) # 14 is the right child of 10
root.right.right.left = Node(13) # 13 is the left child of 14

def dfs(node): # Define the DFS function
    if node is None: # Base case: stop if the node is empty
        return
    print(node.data, end=' ') # Visit the current node (print its value)
    dfs(node.left) # Recursively visit the left subtree
    dfs(node.right)  # Recursively visit the right subtree

print("Depth First Search (Preorder Traversal) of the Tree:") # Output heading
dfs(root) # Start DFS from the root node
