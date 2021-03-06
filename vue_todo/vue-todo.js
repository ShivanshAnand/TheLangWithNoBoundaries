let vm = new Vue({
    el  : "#main",
    data : {   
        currText : "",
        items : []
    },
    methods : {
        addItem : function() {
            if(this.currText.length <= 0) {
                showToast("Can't add an empty item :(" , 1000);
                return;
            }
            let item = {
                cc : new Date().getTime(),
                text : this.currText,
                completed : false,
                disabled : true,
                mClass : {
                    "mark-complete" : false,
                },
                btnToggle : true
            }
            this.items.push(item);
            this.currText = "";
            showToast("New item added !" , 1000);
        },
        removeItem : function(i) {
            this.items.splice(i , 1);
            showToast("Item deleted !" , 1000);
        },
        markAsCompleted : function(i , ev) {
            let e = this.items[i];
            e.completed = !e.completed;
            e.mClass["mark-complete"] = !e.mClass["mark-complete"];
            e.btnToggle = !e.btnToggle;
            showToast(e.completed ? "Task completed !" : "Undoing ..." , 1000);
        },
        makeEditable : function(i) {
            let e = this.items[i];
            e.disabled = !e.disabled;
        },
        makeStatic : function(i) {
            let e = this.items[i];
            e.disabled = !e.disabled;
        }
    },
    computed : {
        placeholder : function() {
            return `Write your todo #${this.items.length + 1}`;
        }
    }
});

let vm2 = new Vue({
    el : "#info-btn",
    methods : {
        clicked : function() {
            let msg = "Created by Shivansh Anand <br />Using it is self-explanatory , if you want to edit a todo just double click on it";
            showToast(msg , 3000);
        }
    }
});

function showToast(msg, time) {
    let t = document.getElementById("toast");
    t.querySelector("p").innerHTML = msg;
    t.classList.remove("op-0");
    t.classList.add("op-1");
    setTimeout(() => {
        t.classList.remove("op-1");
        t.classList.add("op-0");
    }, time + 1000);
}
