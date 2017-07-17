import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './src/dop-filters';
import moment from 'moment';
const configuration={
	filters:{
		bookmark:{
			hideHeader: true,
			controls : {
				bookmarkControl : {
					type:"checkBox",
					options : [
						{decode:'Bookmark Projects',code:1}
					],
					filterCriterions:[
						{fieldName : 'id', type : 'string', operator : 'in'}
					]
				}	
			}
		},
		status:{			
			label: "Status",
			controls:{
				statusCheckBox:{
					type:"checkBoxGroup",
					selectAll: true,
					options:[{decode:'Not Started',code:'BNOT STARTED'},
					{decode:'Cancelled',code:'FCANCELLED'},{decode:'Completed',code:'DCOMPLETED'},
					{decode:'In Error',code:'AIN ERROR'},{decode:'In Progress',code:'CIN PROGRESS'},
					{decode:'On Hold',code:'ADON HOLD'},{decode:'Release In Progress',code:'CDRELEASE IN PROGRESS'}],
				}, 
				statusChangedWithin:{
					label: "Changed Within",
					type:'dropDown',
					multiSelect: false,
					watermark: 'No range limitation',
					searchable: false,
					options: [{decode:'Last 24 hours',code:'Last 24 hours'},
							{decode:'Last 5 days',code:'Last 5 days'},
							{decode:'Last Month',code:'Last Month'},
							{decode:'More than a month',code:'More than a month'}],
				},
				countErrorControl : {
					label: "Need Attention",
					type:"checkBox",
					options : [{decode:'Need Attention',code:1}],
				}			
			}
		},
		nameAndLocation:{
			label:'Name and Location',
			controls:{
				regionControl:{
					label : 'Region',
					type:'dropDown',
					multiSelect: true,
					watermark: 'All Regions',
					options:[{decode:'MIDWEST',code:'MIDWEST'},{decode:'NORTHEAST',code:'NORTHEAST'},
							{decode:'WEST',code:'WEST'}],
				},
				marketControl:{
					label : 'Market',
					type:'dropDown',
					multiSelect: true,
					watermark: 'All Markets',
					options:[{decode:'ALASKA',code:'ALASKA'},{decode:'ATLANTA',code:'ATLANTA'},
							{decode:'L.A.',code:'L.A.'},{decode:'NYC',code:'NYC'},
							{decode:'Boston',code:'Boston'},{decode:'Philadelphia',code:'Philadelphia'},
							{decode:'New Jersey',code:'New Jersey'},{decode:'Alabama',code:'Alabama'}],
				},
				nameAndLocationControl : {
					type : 'text',
					label : 'Project Name',
					watermark: 'Type Project Name...',
				}
			}
		},
		
		type:{
			label:"Profile Type",
			controls : {
				typeControl :{
					type : 'dropDown',
					multiSelect: true,
					watermark: 'All Profile Types',
					options:[{decode:'Type A',code:'typeA'},{decode:'Type B',code:'typeB'},{decode:'Type C',code:'typeC'}],
				}
			}
		},
		date:{
			label:"Completion Date",
			controls : {
				dateControl :{
					type : 'date',
					multiSelect: false,
					watermark: 'Choose Option',	
		
					options:[
						// {decode:'None',code:'None'},
						{decode:'Custom Range',code:'Custom Range'},

						{decode:'LAST',code:'last',disabled:true},{decode:'24 hours',code:'Last 24 hours'},
						{decode:'2 days',code:'Last 2 days'},{decode:'3 days',code:'Last 3 days'},
						{decode:'4 days',code:'Last 4 days'},{decode:'5 days',code:'Last 5 days'},

						{decode:'Next',code:'Next',disabled:true},{decode:'24 hours',code:'Next 24 hours'},
						{decode:'2 days',code:'Next 2 days'},{decode:'3 days',code:'Next 3 days'},
						{decode:'4 days',code:'Next 4 days'},{decode:'5 days',code:'Next 5 days'}],
				}
			}
		},
	}
};
 
var onFilter = function onFilter(filterCriterions){
	console.log(filterCriterions);
}
 
var render = function(){
	let style = {
		'width': '298px',
		'backgroundColor': '#f2f2f2'
	};
	ReactDOM.render(
		<div style={style}>
			<Filter config={configuration} onFilter={onFilter} />
		</div>
		,document.getElementById('filter'));
}

 
render();