import React from "react";

export default function ScheduleCellDropDown () {
    onselect = event => {
        this.props.selectItem(this.props.name, event.target.value);
    };

    return (
        <div>
            <div>{this.props.name}</div>
            <div>
                <select onChange={this.onSelect}>
                    <option>select an option…</option>
                    {this.props.meals.map(meal => (
                    <option key={meal.id} value={meal.id}>
                        {meal.value}
                    </option>
                    ))}
                </select>
            </div>
      </div>
    )

}