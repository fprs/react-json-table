var CheckComponent = React.createClass({
    handleChange: function(i) {
        this.props.onUserInput(i);
    },
	render: function(){
	    let self = this;
	    let inputs = this.props.categories.map(function(d, i){
        	return (
        			<li className = {d} key = {d}>
        				<input type="checkbox" checked={self.props.checkedBox[i]} name={d} ref={d} onChange={function() {self.handleChange(i);}}/>
        				<span> {d} </span>
        			</li>
        		);
        });
		return(
			<ul>
				{inputs}
			</ul>
		);
	}
});

var DisplayComponent = React.createClass({
	render: function(){
	    let self = this;
		let ths = this.props.categories
            .map(function(d){ return( <th key={d}>{d}</th> ) })
            .filter(function(d,i){ return self.props.checkedBox[i] });
        let trs = this.props.data.map(function(d,i){ 
            return (
                <tr key={"row"+i}>
                {
                    Object.keys(d)
			           .map(function(key){ return d[key] })
			           .map(function(data,i){ return( <td key={data+i}>{data}</td>) }) 
			           .filter(function(d,i){ return self.props.checkedBox[i] })
                }
                </tr>
	           );
        });
		return(
			<table>
			    <thead>
    			    <tr key="head-row">
    			        {ths}
    			    </tr>
			    </thead>
			    <tbody>
    			        {trs}
			    </tbody>
			</table>
		);
	}
});

var ParentComponent = React.createClass({
    getInitialState: function(){        
      return{
          checkedBox: this.props.categories.map(function(d){return true;})
      };  
    },
    handleUserInput: function(i) {
        let nextCheckedBox = this.state.checkedBox;
        nextCheckedBox[i] = !nextCheckedBox[i];
        this.setState({
            checkedBox: nextCheckedBox
        });
    },
	render: function(){
		return(
			<div>
				<CheckComponent checkedBox={this.state.checkedBox} onUserInput={this.handleUserInput} categories={this.props.categories}/>
				<DisplayComponent checkedBox={this.state.checkedBox} data={this.props.data} categories={this.props.categories}/>
			</div>
		);
	}
});

var app = document.getElementById('app');
var DATA = [], categories = [];

$.getJSON('data.json',function(d){
    DATA = d;
    categories = Object.keys(DATA[0]);
    ReactDOM.render(<ParentComponent data={DATA} categories={categories} />, app);
});

