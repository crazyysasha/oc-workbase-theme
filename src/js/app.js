import Alpine from 'alpinejs'



Alpine.store('theme', {
    data: {
        darkMode: false,
    },
    init () {
        console.log("init theme");
        
        if (!'theme' in localStorage) {
            localStorage.setItem('theme', {});
            return;
        }
        let theme = JSON.parse(localStorage.getItem('theme'));
        for (const key in theme) {
            this.data[key] = theme[key]; 
        }
        
    },
    toggleDarkMode() {
        localStorage.setItem('theme', JSON.stringify({
            ...this.data,
            darkMode: this.data.darkMode = ! this.data.darkMode,
        }));
    }
})
Alpine.data('multiselect', (items, selected = [], callback = null) => {
    return {
        items: [],
        selected: [],
        isOpen: false,
        toggle(event, item) {
            console.log(this.timeout);
            if (typeof this.timeout != null) {
                console.log("cancel");
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(callback, 2000);
            event.preventDefault();

            // if (!this.selected.find(it => {
            //     return it.value == item.value;
            // })) {
            //     this.selected.push(item);
            //     return;
            // }
            // const index = this.selected.indexOf(item);
            // if (index > -1) {
            //     this.selected.splice(index, 1);
            // }

        
            
        },
        init() {
            this.items = items;
            this.selected = items.filter(item => selected.includes(item.value));
            this.callback = callback;
        },
        toggleOpen(event) {
            event.preventDefault();
            this.isOpen = !this.isOpen;
        },
        timeout: null,
        callback: null,
    };
});

if (Alpine.store.modals === undefined) {
    Alpine.store.modals = {};    
}

Alpine.directive('modal', (el, {value, expression, modifiers}, {Alpine, evaluate, effect}) => {
    
    Alpine.store.modals[expression] =  {
        isOpen: false,
    };
    
    console.log(el.classList.add('hidden'));
    if (value == "show") {
        el.addEventListener('click', () => {
            effect(() => {
                el.classList.remove('hidden');
            });
        });
    }
    console.log(Alpine);
    console.log(value);
    console.log(expression);
    console.log(modifiers);
});

window.Alpine = Alpine;

window.Alpine.start();