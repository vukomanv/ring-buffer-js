class BufferNode {
    next: BufferNode | null;
    val: number | null;

    constructor(val: number) {
        this.val = val;
        this.next = null;
    }
}

export class RingBuffer {
    memStart: BufferNode;
    memEnd: BufferNode; 
    dataStart: BufferNode;
    dataEnd: BufferNode;
    
    constructor(values: number[]){
        if (values.length < 2) throw new Error("array passed to ring buffer's constructor must have length >= 2");

        const testValues = values.slice(1);
        let dummy = new BufferNode(0);
        let node = new BufferNode(values[0]);
        dummy.next = node;

        for (let i = 0; i < testValues.length; i++) {
            const value = testValues[i]
            node.next = new BufferNode(value);
            node = node.next;
        }
        dummy = dummy.next
        node.next = dummy;

        this.memStart = dummy;
        this.memEnd = node;

        this.dataStart = dummy;
        this.dataEnd = node;
    }

    insert(val: number) {
        if (!this.dataEnd.next) throw new Error("ring buffer's data end doesn't have the next node")
        this.dataEnd = this.dataEnd.next;
        if (!this.dataStart.next) throw new Error("ring buffer's data start doesn't have the next node")
        if (this.dataEnd === this.dataStart) this.dataStart = this.dataStart.next;
        this.dataEnd.val = val;
    }

    remove() {
        this.dataStart.val = null;
        if (!this.dataStart.next) throw new Error("ring buffer's data start doesn't have the next node")
        this.dataStart = this.dataStart.next;
    }

    print() {
        const buffer = this;
        let i = buffer.dataStart;
        let elements = "";
        console.log("printing out the buffer: ")
        while (true) {
            elements += i.val + " ";
            if (i === buffer.dataEnd || !i.next) break;
            i = i.next;
        }     
        console.log(elements);
    }
}

