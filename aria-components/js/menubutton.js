// Menu Button trigger functions

const getTrigger = () =>
  document.querySelector('.MenuButton-trigger[aria-expanded="true"]');

const openMenu = trigger => {
  const menu = document.getElementById(trigger.getAttribute('aria-controls'));

  menu.hidden = false;
  trigger.setAttribute('aria-expanded', 'true');
  bindMenu(menu);
};

const closeMenu = trigger => {
  const menu = document.getElementById(trigger.getAttribute('aria-controls'));

  menu.hidden = true;
  trigger.setAttribute('aria-expanded', 'false');
  unbindMenu(menu);
};

const bindMenu = menu => {
  menu.addEventListener('click', onMenuClick);
  menu.addEventListener('keydown', onMenuKeydown);
  menu.addEventListener('blur', onMenuBlur, true);
  document.body.setAttribute('tabindex', '-1');
  document.body.addEventListener('focus', onBodyFocus, true);
};

const unbindMenu = menu => {
  menu.removeEventListener('click', onMenuClick);
  menu.removeEventListener('keydown', onMenuKeydown);
  menu.addEventListener('blur', onMenuBlur, true);
  document.body.removeAttribute('tabindex');
  document.body.removeEventListener('focus', onBodyFocus, true);
};

Array.from(document.querySelectorAll('.MenuButton-trigger')).forEach(
  menuButton => {
    menuButton.addEventListener('click', event => {
      const trigger = event.target;
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        closeMenu(trigger);
        trigger.focus();
      } else {
        openMenu(trigger);
        document
          .getElementById(trigger.getAttribute('aria-controls'))
          .firstElementChild.firstElementChild.focus();
      }
    });

    // Optional keydown handlers
    menuButton.addEventListener('keydown', event => {
      const trigger = event.target;
      const key = event.key.replace('Arrow', ''); // MS does not include "Arrow"
      const menu = document.getElementById(
        trigger.getAttribute('aria-controls')
      );
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      if (key.match(/Up|Down|Enter|Spacebar|\s/u)) {
        event.preventDefault();

        if (isExpanded && key.match(/Enter|Spacebar|\s/u)) {
          closeMenu(trigger);
          trigger.focus();
        } else {
          openMenu(trigger);

          // handle focus
          switch (key) {
            case 'Up':
              // focus last menu item
              menu.lastElementChild.firstElementChild.focus();
              break;
            case 'Down':
            case 'Enter':
            case ' ':
            case 'Spacebar': // For older browsers
              // focus first menu item
              menu.firstElementChild.firstElementChild.focus();
              break;
          }
        }
      }
    });
  }
);

/* Menu functions */

const findMatch = (needle, haystack) =>
  haystack.textContent.toLowerCase().startsWith(needle.toLowerCase());

const filterFAQ = options => {
  // perform filter
  console.log(options.map(item => item.textContent).join(','));
};

const selectItem = selection => {
  const role = selection.getAttribute('role');
  const trigger = getTrigger();
  const menu = document.getElementById(trigger.getAttribute('aria-controls'));
  let checked = [selection];

  const isChecked = selection.getAttribute('aria-checked') === 'true';

  if (role !== 'menuitem') {
    if (role === 'menuitemradio' && !isChecked) {
      // make sure its a radio and hasn't been checked already
      let selected = menu.querySelector('[aria-checked="true"]');

      if (selected) {
        // unselect any previously selected items
        selected.setAttribute('aria-checked', 'false');
      }

      selection.setAttribute('aria-checked', 'true'); // select the new item
    }

    if (role === 'menuitemcheckbox') {
      selection.setAttribute('aria-checked', !isChecked);
    }

    checked = [...menu.querySelectorAll('[aria-checked="true"]')];
  } else {
    closeMenu(trigger);
    trigger.focus();
  }

  filterFAQ(checked);
};

const onMenuClick = event => selectItem(event.target);

const onMenuKeydown = function onMenuKeydown(event) {
  const target = event.target;
  const key = event.key.replace('Arrow', '');
  const trigger = getTrigger();
  const menu = this;
  const items = [...menu.querySelectorAll('.MenuButton-item')];
  let index = items.indexOf(target);

  switch (key) {
    case 'Up':
    case 'Left':
      // move to previous item
      event.preventDefault();
      if (index > 0) {
        items[(index -= 1)].focus();
      } else {
        items[items.length - 1].focus();
      }
      break;
    case 'Down':
    case 'Right':
      // move to next item
      event.preventDefault();
      if (index !== items.length - 1) {
        items[(index += 1)].focus();
      } else {
        items[0].focus();
      }
      break;
    case 'Home':
      // move to first item
      event.preventDefault();
      items[0].focus();
      break;
    case 'End':
      // move to last item
      event.preventDefault();
      items[items.length - 1].focus();
      break;
    case 'Escape':
    case 'Esc':
      // close menu without a selection
      event.preventDefault();
      event.stopPropagation();
      closeMenu(trigger);
      trigger.focus();
      break;
    case 'Enter':
    case ' ':
    case 'Spacebar':
      // make a selection
      event.preventDefault();
      selectItem(target);
      break;
    case 'Tab':
      // exit menu button
      closeMenu(trigger);
      break;
    default:
      // type ahead

      // Do any of the items start with the character? Easy out
      if (items.some(option => findMatch(key, option))) {
        // Find out if an item is already focused
        let focused = items.indexOf(document.activeElement);
        let next;

        // Nothing focused, start from the top
        if (focused === -1) {
          next = items.findIndex(option => findMatch(key, option));
        } else {
          const start = (focused += 1);
          const results = [...items.slice(start), ...items.slice(0, start)];
          next = items.indexOf(results.find(item => findMatch(key, item)));
        }

        // Found something
        if (next !== -1) {
          items[next].focus();
        }
      }
      break;
  }
};

/* Focus handler on body, to hide listbox. Mostly for iOS */
const onBodyFocus = event => {
  const trigger = getTrigger();
  const menu = document.getElementById(trigger.getAttribute('aria-controls'));

  if (!menu.parentElement.contains(event.target)) {
    closeMenu(trigger);
  }
};

const onMenuBlur = event => {
  const trigger = getTrigger();
  const menu = document.getElementById(trigger.getAttribute('aria-controls'));

  if (menu && !menu.contains(event.relatedTarget)) {
    closeMenu(getTrigger());
  }
};
