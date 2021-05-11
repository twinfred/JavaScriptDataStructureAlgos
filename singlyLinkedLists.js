class Node {
  constructor(data, next) {
    this.data = data || null;
    this.next = next || null;
  }
}

class SLL {
  constructor(head) {
    this.head = head || null;
  }

  insertAtEnd(data) {
    if(!data) {
      return null;
    }

    let runner = this.head;

    if (!this.head) {
      this.head = new Node(data);
      return this;
    }

    while(runner.next) {
      runner = runner.next;
    }

    runner.next = new Node(data);
    return this;
  }

  insertAtStart(data) {
    if(!data) {
      return null;
    }

    let temp = this.head;
    this.head = new Node(data);
    this.head.next = temp;
    return this;
  }

  getLength() {
    if (!this.head) {
      return 0;
    }

    if (!this.head.next) {
      return 1;
    }

    let length = 2;

    let runner = this.head.next;
    while(runner.next) {
      length += 1;
      runner = runner.next;
    }

    return length;
  }

  delete(data) {
    if(!data) {
      return null;
    }

    if (data === this.head.data) {
      this.head = this.head.next;
      return this;
    }

    let previousNode = this.head;
    let runner = this.head.next;

    while (runner.data !== data) {
      if (runner.next) {
        previousNode = runner;
        runner = runner.next;
      } else {
        return null;
      }
    }

    previousNode.next = runner.next;
    return this;
  }

  insertAfter(data, after) {
    // missing argument
    if(!data || !after) {
      return null;
    }

    // list length is 0
    if (!this.head) {
      return null;
    }

    // insert after head. list length is 1
    if (after === this.head && !this.head.next) {
      this.head.next = new Node(data);
      return this;
    }

    let runner = this.head;
    let nextNode = this.head.next;

    // list length is 1 and after location doesn't exist in the list
    if (!runner || !nextNode) {
      return null;
    }

    while (after !== runner.data) {
      runner = nextNode;
      nextNode = nextNode.next;

      // after location doesn't exist in the list
      if (!nextNode) {
        return null;
      }
    }

    runner.next = new Node(data);
    runner.next.next = nextNode;

    return this;
  }

  insertBefore(data, before) {
    // missing argument
    if(!data || !before) {
      console.log('exit 1');
      return null;
    }

    // list length is 0
    if (!this.head) {
      console.log('exit 2');
      return null;
    }

    // insert before head
    if(before === this.head.data) {
      this.insertAtStart(data);
    }

    let runner = this.head.next;

    // list length is 1 and before location doesn't exist in the list
    if (!runner) {
      return null;
    }

    // insert before second node
    if (before === runner.data) {
      const temp = runner;
      this.head.next = new Node(data);
      this.head.next.next = temp;
      return this;
    }

    // list is only 2 long and before location doesn't exist
    if (!runner.next) {
      return null;
    }

    while (before !== runner.next.data) {
      runner = runner.next;

      // before location doesn't exist in list
      if (!runner.next) {
        return null;
      }
    }

    const temp = runner.next;
    runner.next = new Node(data);
    runner.next.next = temp;
    return this;
  }

  getNthToLast(n) {
    // no list length
    if (!this.head || typeof n !== 'number') {
      return null;
    }

    let runner = this.head;
    let nBehindRunner = null;
    let runnerDistance = 0;

    // list is only 1 node long
    if (!runner.next) {
      return this.head;
    }

    // n is last element
    if (n === 0) {
      while(runner.next) {
        runner = runner.next;
      }

      return runner;
    }

    // n is 1 or greater
    while(runner.next) {
      if (!nBehindRunner) {
        runnerDistance += 1;
      } else {
        nBehindRunner = nBehindRunner.next;
      }

      runner = runner.next;

      if(runnerDistance === n && !nBehindRunner) {
        nBehindRunner = this.head;
      }
    }

    return nBehindRunner;
  }
}

const myList = new SLL();
myList.insertAtEnd(1).insertAtEnd(2).insertAtEnd(3).insertAtEnd(4).insertAtEnd(5);
console.log(myList.getNthToLast(5));

class Stack {
  constructor(head) {
    this.head = head || null;
  }

  add(data) {
    if (!data) {
      return null;
    }

    if (!this.head) {
      this.head = new Node(data);
      return this;
    }

    if (!this.head.next) {
      this.head.next = new Node(data);
      return this;
    }

    let runner = this.head.next;

    if (!runner) {
      runner.next = new Node(data);
      return this;
    }

    while (runner.next) {
      runner = runner.next;
    }

    runner.next = new Node(data);
    return this;
  }

  remove() {
    // nothing to remove
    if (!this.head) {
      return null;
    }

    let runner = null;

    // list is only 1 node long
    if (!this.head.next) {
      console.log('list is only 1 node long');
      runner = this.head;
      this.head = null;
      return runner;
    }

    // [1, 2, 3, 4]
    //        p  r

    let previousNode = this.head;
    runner = this.head.next;

    while (runner.next) {
      previousNode = runner;
      runner = runner.next;
    }

    previousNode.next = null;
    return runner;
  }

  getLength() {
    if (!this.head) {
      return 0;
    }

    if (!this.head.next) {
      return 1;
    }

    let length = 2;

    let runner = this.head.next;
    while(runner.next) {
      length += 1;
      runner = runner.next;
    }

    return length;
  }
}

// const myStack = new Stack();
// myStack.add(1).add(2).add(3).add(4);
// console.log(myStack);
// console.log(myStack.getLength());
// myStack.add(5).add(6).remove();
// console.log(myStack);
// console.log(myStack.getLength());