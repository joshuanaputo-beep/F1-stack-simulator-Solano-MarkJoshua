class Queue {
    constructor() {
        this.items = []
        this.count = 0
    }

    // Add element to top of stack
    enqueue(element) {
        let id = this.count;
        this.items[this.count] = { value: element, id: id }
        let push_res = `${element}`;
        //console.log(`added to ${this.count}`);
        this.count += 1;
        let count = this.count - 1;
        //return [push_res,count];
        console.log(push_res);
        return [push_res, id];
    }

    // Return and remove top element in stack
    // Return undefined if stack is empty
    dequeue() {
        if(this.count == 0) return undefined
        let deleteItem = this.items.shift()
        this.count -= 1
        console.log(`${deleteItem.value} removed`)
        return [deleteItem.value, deleteItem.id]
    }

    // Check top element in stack
    peek() {
        if(this.count == 0) return undefined
        console.log(`Front element is ${this.items[0].value}`)
        return [this.items[0].value, this.items[0].id]
    }

    // Check if stack is empty
    isEmpty() {
        console.log(this.count == 0 ? 'Queue is empty' : 'Queue is NOT empty')
        return this.count == 0
    }

    // Check size of stack
    size() {
        console.log(`${this.count} elements in queue`)
        return this.count
    }

    // Print elements in stack
    print() {
        let str = ''
        for(let i = 0; i < this.count; i++) {
            str += this.items[i].value + ' '
        }
        return str
    }

    // Clear stack
    clear() {
        this.items = []
        this.count = 0
        console.log('Queue cleared..')
        return this.items
    }
}

const queue = new Queue()

$(document).ready(function(){
    $("#btn_enqueue").on("click", function(){
        let input = $("#q_data").val().trim();

        if(input === "") {
            alert("Please enter a value!");
            return;
        }

        let push_data = queue.enqueue(input)

        $("#queue").children().last().before(
            `<div id="st${push_data[1]}" class="row bg-primary push">${push_data[0]}</div>`
        );

        $("#q_data").val("");
    });

    $("#btn_dequeue").on("click", function(){
        let dequeue_data = queue.dequeue();

        if(dequeue_data === undefined) {
            alert("Queue is empty!");
            return;
        }

        $("#dequeued").prepend(
            `<div class="row pop text-bg-danger border border-light">${dequeue_data[0]}</div>`
        );

        $(`#st${dequeue_data[1]}`).remove();
    });

    $("#btn_peek").on("click", function(){
        let peek_data = queue.peek();

        if(peek_data === undefined) {
            alert("Queue is empty!");
            return;
        }

        $(`#st${peek_data[1]}`).removeClass("bg-primary").addClass("peek");

        setTimeout(function(){
            $(`#st${peek_data[1]}`).removeClass("peek").addClass("bg-primary");
        }, 500)
    });

    $("#btn_clear").on("click", function(){
        queue.clear();
        $("#queue").html(`
            <div class="text-center text-white fw-bold">FRONT ↓</div>
            <div class="text-center text-white fw-bold">↑ REAR</div>
        `);
        $("#dequeued").empty();
    });

    // $("#stack").prepend(`<div class="row bg-primary push">${stack.push(100)[0]}</div>`);
    // $("#stack").prepend(`<div class="row bg-success push">${stack.push(200)[0]}</div>`);
    // $("#stack").prepend(`<div class="row bg-primary push">${stack.push(300)[0]}</div>`);
    // $("#stack").prepend(`<div class="row bg-success push">${stack.push(400)[0]}</div>`);
});