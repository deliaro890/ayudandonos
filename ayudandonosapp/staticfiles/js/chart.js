var red = document.getElementById('red').value;
console.log('elemento',red[29]) // cada elemento es un string!!! no es un elemento real de un array, y todo por traerlo asi como un value!!! supongo que con una api si trae elemento por elemento!!!


redStrings = red.split(',')

redCero=redStrings[0].split('[')
console.log(redCero[1])

console.log(redStrings)
console.log(typeof(redCero[1]))


redEnteros=[]

for (a in redStrings){
    console.log(redStrings[a])

    a = parseInt(redStrings[a])
    
    redEnteros.push(a)

}

console.log(redEnteros)
console.log(redEnteros[0])

var index = redEnteros.indexOf(0);
redEnteros.splice(redEnteros[0], 1)
console.log(redEnteros)
rc=parseInt(redCero[1])
redEnteros.unshift(rc)
console.log(redEnteros.length);

arr=[]
for (i=0; i<=redEnteros.length;i++){ //con i+2 se estaba quedando sin memoria ._.
    arr3=[]
    a = i+1 
    arr3.push(redEnteros[i])
    arr3.push(redEnteros[a])
    arr.push(arr3)
}
console.log(arr)

arr2_0=[]
for(d=0;d<=arr.length;d++){
    if(d%2==0){
        arr2_0.push(arr[d])
    }
}
arr2_0.pop()
console.log('jijitl',arr2_0)

redes=[[40, 41], [41, 43], [43, 45], [45, 48], [48, 51], [41, 44], [40, 42], [42, 47]]


Highcharts.chart('container', {

    chart: {
        height: 600,
        inverted: true
    },

    title: {
        text: 'Organización multinivel'
    },

    series: [{
        type: 'organization',
        name: 'Highsoft',
        keys: ['from', 'to'],
        data: arr2_0,
        levels: [
            {
                level: 0,
                color: 'silver',
                dataLabels: {
                    color: 'black',
                    nombre:'jojo'
                },
                height: 25
            }, 

            {
                level: 1,
                color: 'pink',
                dataLabels: {
                    color: 'black'
                },
                height: 25
            },
            
            {
                level: 3,
                color: 'purple',
                dataLabels: {
                    color: 'white'
                },
                height: 25
            }, 
            {
                level: 4,
                color: 'orange',
                dataLabels: {
                    color: 'white'
                },
                height: 25
            }, 
            
        
        ],

        nodes: [{

            
            id: '42', //data!!
            title: null,
            name: 'ar',
            color: "purple",
            column: 1, //1 bien pero empujar a la derecha
            layout: 'hanging',
            offset: '49%'
         


            
        }],
        
        colorByPoint: false,
        color: '#007ad0',
        dataLabels: {
            color: 'white',
            nodeFormatter: function () {
                // Call the default renderer
                var html = Highcharts.defaultOptions
                    .plotOptions
                    .organization
                    .dataLabels
                    .nodeFormatter
                    .call(this);

                // Do some modification
                html = html.replace(
                    '<h4 style="',
                    '<h4 style="font-style: italic;'
                );
                return html;
            }
        },
        borderColor: 'white',
        nodeWidth: 65
    }],
    tooltip: {
        outside: true
    },
    exporting: {
        allowHTML: true,
        sourceWidth: 800,
        sourceHeight: 600
    }

});
