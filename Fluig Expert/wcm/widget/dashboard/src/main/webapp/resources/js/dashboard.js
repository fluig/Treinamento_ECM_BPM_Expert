var HelloWorld = SuperWidget.extend({
    message: null,

    init: function () {
    	var _this = this;
    	
    	_this.iniciarColorPick();
    	_this.iniciarGrafico();
    },

    bindings: {
        local: {
            'show-message': ['click_showMessage'],
            'salvar':['click_salvarPreferencias']
        }
    },

    showMessage: function () {
        $div = $('#helloMessage_' + this.instanceId);
        $message = $('<div>').addClass('message').append(this.message);
        $div.append($message);
    },
    
    salvarPreferencias: function (){    	
    	var corSelecionada = $("#colorpicker-example-generic").val();
    	var preferences = {
		    cor: corSelecionada
		};
		  
		WCMSpaceAPI.PageService.UPDATEPREFERENCES({
		    async: true,
		    success: function (data) {
	            FLUIGC.toast({
	            	title: "",
	            	message:"Preferencias Salvas.",
	            	type:"success"
	            });
		    },
		    fail: function (xhr, message, errorData) {
	            FLUIGC.toast({
	            	title: "",
	            	message:"Ops, aconteceu um erro ao salvar as preferencias.",
	            	type:"error"
	            });
		    }
		}, this.instanceId, preferences);
    },
    
    iniciarColorPick: function(){
    	var settings = {
		    changeDelay: 200,
		    control: 'wheel',
		    inline: false,
		    letterCase: 'lowercase',
		    opacity: true,
		    position: 'bottom left',
		    customColorNames: {
		        'mycustomcolor': '#123456'
		    }
		} 
		var myColorPicker = FLUIGC.colorpicker('#colorpicker-example-generic', settings);
    },
    
    iniciarGrafico: function(){
    	
    	var callback = {
    			success: function(dataset){
    		    	var colunas = [];
    		    	var dados = []

    		    	for(var i=0; i<dataset.values.length; i++){
    		    	    colunas[i] = dataset.values[i].Tipo
    		    	    dados[i] = dataset.values[i].Total_Tarefas
    		    	}
    		    	
    		    	var chart = FLUIGC.chart('#MY_SELECTOR');
    		    	var data = {
    				    labels: colunas,
    				    datasets: [
    				        {
    				            label: "My First dataset",
    				            fillColor: "rgba(120,120,120,0.2)",
    				            strokeColor: "rgba(120,120,120,1)",
    				            pointColor: "rgba(120,120,120,1)",
    				            pointStrokeColor: "#fff",
    				            pointHighlightFill: "#fff",
    				            pointHighlightStroke: "rgba(120,120,120,1)",
    				            data: dados
    				        }
    				    ]
    				};
    		    	var options = {
    		    			
    		    	}
    		    	
    		    	var lineChart = chart.line(data, options);
    			}, 
    			
    			error: function(jqXHR, textStatus, errorThrown){
    				console.log(jqXHR);
    				console.log(textStatus);
    				console.log(errorThrown);
    				
					FLUIGC.toast({
						title:"",
						message: "Falha ao carregar gráfico",
						type:"error"
					})
    			}
    	}
    	
    	var c1 = DatasetFactory.createConstraint("coduser", WCMAPI.userCode, WCMAPI.userCode, ConstraintType.MUST);
    	var filtro = new Array(c1);
    	var dataset = DatasetFactory.getDataset("ds_grafico", null, filtro, null, callback);
    	
    }
    
});