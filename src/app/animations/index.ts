import { trigger, state, style, transition, animate, keyframes } from "@angular/animations";

export const enterLeave =  trigger('enterLeave', [
    // :ENTER TRANSITION
    // Transition Styles
    transition('void => *', [
        // 'From' styles
        style({
            opacity: 0,
            // transform: 'translateX(-100vw)'
        }),
        animate('1000ms ease-out',
            // 'To' styles
            // 1 - Comment this to remove the item's grow...
            style({
                opacity: 1,
                //   transform: 'scale(1.2)'
            })
        )
    ])
])