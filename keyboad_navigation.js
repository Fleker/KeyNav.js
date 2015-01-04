function KeyboardNavigation() {
    this.focusset = ".";
    this.row = 1;
    this.col = 1;
    this.changeFocus = function(set) {
        try {
            $(this.currElement()).removeClass('keyboard-focus');
        } catch(e) { console.error(e.message)}
        console.log('Switch from '+this.focusset+' to '+set);
        this.focusset = set;  
        this.row = 0;
        this.col = 0;
        console.log(this.currElement());
        if(this.exists(this.getFocus(), this.getRow(), this.getCol()))
            $(this.currElement()).addClass('keyboard-focus');
    };
    this.moveUp = function(delta) {
        delta = delta || -1;
        if(this.exists(this.focusset, this.row+delta, this.col)) {
            $(this.currElement()).removeClass('keyboard-focus');
            this.row = this.row+delta;   
            $(this.currElement()).addClass('keyboard-focus');
        } else if(delta > 0) {
            //Last Item   
            $(this.currElement()).trigger({
                type:'rightRow',
                col:this.getCol()
            });
        } else if(this.row+delta < 0) {
            //First item
            $(this.currElement()).trigger({
                type:'leftRow',
                col:this.getCol()
            });
        }
        
    };
    this.moveDown = function(delta) {
        delta = -delta || 1;
        this.moveUp(delta);  
    };
    this.moveLeft = function(delta) {
        delta = delta || -1;
        if(this.exists(this.focusset, this.row, this.col+delta)) {
            $(this.currElement()).removeClass('keyboard-focus');
            this.col = this.col+delta;   
            $(this.currElement()).addClass('keyboard-focus');
        } else if(delta > 0) {
            //Last item
            $(this.currElement()).trigger({
                type:"rightCol",
                row:this.getRow()
            });
        } else if(this.col+delta < 0) {
            //First item
            $(this.currElement()).trigger({
                type:"leftCol",
                row:this.getRow()
            });
        }
    };
    this.moveRight = function(delta) {
        delta = -delta || 1;
        this.moveLeft(delta);  
    };
    this.getFocus = function() {
        return this.focusset;
    };  
    this.getRow = function() {
        return this.row;
    };  
    this.getCol = function() {
        return this.col;  
    };
    this.exists = function(set, r, c) {
        if(set == "grid") 
            return $('grid-layout /deep/ grid-card[data-focus-set="'+set+'"][data-focus-row="'+r+'"][data-focus-col="'+c+'"]').length > 0;
        return $('[data-focus-set="'+set+'"][data-focus-row="'+r+'"][data-focus-col="'+c+'"]').length > 0;  
    };
    this.getElement = function(set, r, c) {
        if(set == "grid") 
            return $('grid-layout /deep/ grid-card[data-focus-set="'+set+'"][data-focus-row="'+r+'"][data-focus-col="'+c+'"]')[0];
        return $('[data-focus-set="'+set+'"][data-focus-row="'+r+'"][data-focus-col="'+c+'"]')[0]; 
    };
    this.currElement = function() {
        return this.getElement(this.focusset, this.row, this.col);  
    };
}
KeyNav = new KeyboardNavigation();
$(document).on('keydown', function(ev) {
    if(ev.which == 37) {
        KeyNav.moveLeft();   
    } else if(ev.which == 38) {
        KeyNav.moveUp();   
    } else if(ev.which == 39) {
        KeyNav.moveRight();   
    } else if(ev.which == 40) {
        KeyNav.moveDown();
    } else if(ev.which == 13) {
        $(KeyNav.currElement()).trigger("keyboard-enter");
    }
    if(KeyNav.exists(KeyNav.getFocus(), KeyNav.getRow(), KeyNav.getCol()))
        KeyNav.currElement().scrollIntoView();
    //Prevent funny stuff
    return false;
});
