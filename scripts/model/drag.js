class DragAndDrop {

    currentlyDragging;
    startContainer;



    constructor() {
        this.drags = [];
        this.drops = [];

        this.fOnDrop = undefined;
        this.fOnDragOver = undefined;
        this.fOnDragLeave = undefined;
        this.fOnStartDrag = undefined;
    }

    addDrag(items) {

        items.forEach(item => {
            if (item) {

                var encontro = false;
                for (let i = 0; i < this.drags.length; i++) {
                    var d = this.drags[i];
                    if (d === item) {
                        encontro = true;
                        i = this.drags.length;
                    }
                }
                if (encontro === false) {
                    this.drags.push(item);


                    item.setAttribute('draggable', "true");

                    item.addEventListener("dragstart", ev => {
                        if (ev && ev.dataTransfer) {
                            ev.dataTransfer.effectAllowed = 'move';
                        }

                        if (ev.target) {
                            var target = ev.target;
                            this.currentlyDragging = target;
                            this.startContainer = target.parentNode;

                            this.OnStartDrag();
                        }
                    });
                }


            }
        });

    }

    addDrop(containers) {

        containers.forEach(container => {

            var encontro = false;
            for (let i = 0; i < this.drops.length; i++) {
                var d = this.drops[i];
                if (d === container) {
                    encontro = true;
                    i = this.drops.length;
                }
            }
            if (encontro === false) {
                this.drops.push(container);


                container.addEventListener("dragover", (ev) => {
                    ev.preventDefault();
                    container.classList.add('hovering');
                    this.onDragOver();
                });

                container.addEventListener("dragleave", () => {
                    container.classList.remove('hovering');
                    this.onDragLeave();
                });

                container.addEventListener("drop", () => {
                    container.classList.remove('hovering');

                    this.onDrog(container);

                    this.currentlyDragging = undefined;
                    this.startContainer = undefined;
                });

            }

        });


    }

    insertAfter(newNode, existingNode) {
        var parent = existingNode.parentNode;
        if (parent) {
            parent.insertBefore(newNode, existingNode.nextSibling);
        }
    }

    insertBefore(newNode, existingNode) {
        var parent = existingNode.parentNode;
        if (parent) {
            parent.insertBefore(newNode, existingNode);
        }
    }


    onDragOver() {
        if (this.fOnDragOver) {
            this.fOnDragOver();
        }

    }

    onDragLeave() {
        if (this.fOnDragLeave) {
            this.fOnDragLeave();
        }
    }

    onDrog(elemento) {
        if (this.fOnDrop) {
            this.fOnDrop(elemento, this.currentlyDragging);
        }
    }

    OnStartDrag() {
        if (this.fOnStartDrag) {
            this.fOnStartDrag();
        }
    }


    setOnDragOver(fOnDragOver) {
        this.fOnDragOver = fOnDragOver;
    }

    setOnDragLeave(fOnDragLeave) {
        this.fOnDragLeave = fOnDragLeave;
    }

    setOnDrog(fOnDrop) {
        this.fOnDrop = fOnDrop;
    }

    setOnStartDrag(fOnStartDrag) {
        this.fOnStartDrag = fOnStartDrag;
    }

    getCurrentDrag() {
        return this.currentlyDragging;
    }

    getStartContainerOfDrag() {
        return this.startContainer;
    }


}

