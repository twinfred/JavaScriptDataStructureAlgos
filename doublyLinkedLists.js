// FLatten List

class Node {
  constructor(data, next, previous, child) {
    this.data = data;
    this.next = next;
    this.previous = previous;
    this.child = child;
  }
}

class DLL {
  constructor(head, tail) {
    this.head = head;
    this.tail = tail;
  }

  appendNode(node) {
    if (!this.head && !this.tail) {
      this.head = node;
      this.tail = node;
    }

    this.tail.next = node;
    this.tail = node;
  }

  setNewTail() {
    if (!this.tail) return;

    while(this.tail.next) {
      this.tail = this.tail.next;
    }
  }

  flattenRecursive(startingNode) {
    if (!startingNode) startingNode = this.head;

    if (!startingNode.child && !startingNode.next) {
      this.tail = startingNode;
      return;
    }

    if(startingNode.child) {
      this.tail.next = startingNode.child;
      startingNode.previous = this.tail;
      this.tail = startingNode.child;
      this.setNewTail();
      if(startingNode.next) {
        this.flattenRecursive(startingNode.next);
      }
    } else {
      this.flattenRecursive(startingNode.next);
    }
  }

  flattenSimplifiedRecursive(startingNode) {
    let runner = startingNode || this.head;

    if (!runner.next && !runner.child) return;

    while(runner.next) {
      if(runner.child) {
        this.tail.next = runner.child;
        runner.previous = this.tail;
        this.setNewTail();
      }
      runner = runner.next;
    }

    if(runner.child) {
      this.tail.next = runner.child;
      runner.previous = this.tail;
      this.setNewTail();
      this.flattenSimplified(runner.next);
    }
  }
}

