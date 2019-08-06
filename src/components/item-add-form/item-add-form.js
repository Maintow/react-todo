import React, { Component } from 'react';

import './item-add-form.css';

//Класс отвечающий за добавление пунктов
export default class ItemAddForm extends Component {

    state = {
        label: ''
    }

    //Функция отслеживающая изменение строки ввода
    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    //Функция выполняющаяся при клике на конпку или нажатии Enter
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({
            label: ''
        });
    };
    
    //Форма добавления пунктов
    render() {
        return (
            <form className="item-add-form d-flex"
                  onSubmit={this.onSubmit}>
                <input type="text"
                        className="form-control"
                        onChange={this.onLabelChange}
                        placeholder="What needs to be done" 
                        value={this.state.label}/>
                <button className="btn btn-outline-secondary">
                    Add Item
                </button>
            </form>
        )
    }
}