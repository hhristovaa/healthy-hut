export const DIETS = [
    {
        'value': 'vegan',
        'label': 'Vegan'

    },
    {
        'value': 'vegetarian',
        'label': 'Vegetarian'

    },
    {
        'value': 'ketogenic',
        'label': 'Ketogenic'

    },
    {
        'value': 'gluten-free',
        'label': 'Gluten free'

    },
    {
        'value': 'dairy-free',
        'label': 'Dairy Free'

    },
    {
        'value': 'paleo',
        'label': 'Paleo'

    }
];

export const DISHES = [
    {
        'value': 'breakfast',
        'label': 'Breakfast'

    },
    {
        'value': 'lunch',
        'label': 'Lunch'

    },
    {
        'value': 'salad',
        'label': 'Salad'

    },
    {
        'value': 'soup',
        'label': 'Soup'

    },
    {
        'value': 'appetizer',
        'label': 'Appetizer'

    },
    {
        'value': 'dinner',
        'label': 'Dinner'

    },
    {
        'value': 'dessert',
        'label': 'Dessert'

    },
    {
        'value': 'drink',
        'label': 'Drink'

    }
];

export const INTOLERANCES = [
    {
        'value': 'dairy',
        'label': 'Dairy'

    },
    {
        'value': 'egg',
        'label': 'Egg'

    },
    {
        'value': 'grain',
        'label': 'Grain'

    },
    {
        'value': 'seafood',
        'label': 'Seafood'

    },
    {
        'value': 'soy',
        'label': 'Soy'

    },
    {
        'value': 'shellfish',
        'label': 'Shellfish'

    },
    {
        'value': 'sulfite',
        'label': 'Sulfite'

    },
    {
        'value': 'peanut',
        'label': 'Peanut'

    }
];

export const CUISINES = [
    {
        'value': 'american',
        'label': 'American'

    },
    {
        'value': 'british',
        'label': 'British'

    },
    {
        'value': 'chinese',
        'label': 'Chinese'

    },
    {
        'value': 'european',
        'label': 'European'

    },
    {
        'value': 'mediterranean',
        'label': 'Mediterranean'

    },
    {
        'value': 'greek',
        'label': 'Greek'

    },
    {
        'value': 'italian',
        'label': 'Italian'

    },
    {
        'value': 'thai',
        'label': 'Thai'

    }
];

export const ACTIONS = {
    ADD: 'add',
    REMOVE: 'remove',
    INIT: 'init'
};

export const SLIDER_OPTIONS = {
    perPage: 4,
    gap: '5rem',
    perMove: 1,
    rewind: true,
    rewindSpeed: 3000,
    breakpoints: {
        986: {
            perPage: 3
        },
        640: {
            perPage: 2
        },
        425: {
            perPage: 1
        }
    }
};