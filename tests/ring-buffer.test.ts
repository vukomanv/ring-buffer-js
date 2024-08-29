import { RingBuffer } from "../src/ring-buffer";

describe("RingBuffer tests", () => {
    it("should initialize when input is valid", () => {
        const input = [1, 2, 3, 4];

        const ringBuffer = new RingBuffer(input);

        expect(getBufferData(ringBuffer)).toEqual([1, 2, 3, 4])
        expect(getBufferMem(ringBuffer)).toEqual([1, 2, 3, 4])
    })
     
    it("should fail when input array is too short", () => {
        const input = [1];
        expect(() => new RingBuffer(input)).toThrow();
    })

    it("should insert value when input is valid", () => {
        const ringBuffer = new RingBuffer([1, 2, 3, 4]);

        ringBuffer.insert(5);
        
        expect(getBufferData(ringBuffer)).toEqual([2, 3, 4, 5])
        expect(getBufferMem(ringBuffer)).toEqual([5, 2, 3, 4])
    })

    it("should remove value", () => {
        const ringBuffer = new RingBuffer([1, 2, 3, 4]);

        ringBuffer.remove();
        
        expect(getBufferData(ringBuffer)).toEqual([2, 3, 4])
        expect(getBufferMem(ringBuffer)).toEqual([null, 2, 3, 4])
    })
})

function getBufferData(buffer: RingBuffer) {
    let i = buffer.dataStart;
    let elements = [];
    while (true) {
        elements.push(i.val)
        if (i === buffer.dataEnd || !i.next) break;
        i = i.next;
    }     
    return elements;
}

function getBufferMem(buffer: RingBuffer) {
    let i = buffer.memStart;
    let elements = [];
    while (true) {
        elements.push(i.val)
        if (i === buffer.memEnd || !i.next) break;
        i = i.next;
    }     
    return elements;
}