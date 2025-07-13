#Trie.py
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False  
class Trie:
    def __init__(self):
        self.root = TrieNode()  

    def insert(self, word):
        node = self.root  
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()  
            node = node.children[char]  
        node.is_end_of_word = True  

    def search(self, word):
        node = self.root 
        for char in word:
            if char not in node.children:
                return False  
            node = node.children[char]
        return node.is_end_of_word 


trie = Trie()

words_to_insert = ["caterpillar", "cat", "pillar", "catch", "scan"]
for word in words_to_insert:
    trie.insert(word)

search_words = ["caterpillar", "cat", "pillar", "catch", "scan", "rat", "Cathy"]

for word in search_words:
    if trie.search(word.lower()):  
        print(f"'{word}' exists in the Trie.")
    else:
        print(f"'{word}' does NOT exist in the Trie.")
