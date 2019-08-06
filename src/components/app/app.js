import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

//Основное приложение, хранит данные
export default class App extends Component {

  maxId = 100;

  //Основные данные
  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    filter: 'all'
  };


  //Создание пункта
  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  //Удаление пункта по индексу
  deleteItem = (id) => {
    this.setState(({ todoData }) => {

      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx), 
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };
  
  //Добавление пункта
  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArray = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArray
      };
    });
  };

  //Функция для измененимя различных свойств списка
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  //Изменение важности пунктов
  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  //Изменение выполнености пунктов
  onToggleDone = (id) => {

    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  //Функция поиска
  search(items, term) {
    if(term.lenght === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  //Функция отслеживающая изменение поиска
  onSearchChange = (term) => {
    this.setState({ term });
  };

  //Функция отслеживающая изменение фильтра
  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  //Варианты фильтра
  filter(items, filter) {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  //Основное приложение
  render() {

    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(
      this.search(todoData, term), filter)
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel 
            onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter 
            filter={filter} 
            onFilterChange={this.onFilterChange} />
        </div>
  
        <TodoList 
          todos={visibleItems} 
          onDeleted={ this.deleteItem }
          onToggleImportant={this.onToggleImportant}
          onToggleDone = {this.onToggleDone}
          />

        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
};

