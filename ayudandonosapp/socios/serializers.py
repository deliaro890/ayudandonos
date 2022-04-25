""" Redes serializers! """
from email.policy import default
from rest_framework import serializers

class SocioSerializer(serializers.Serializer):
  nombre = serializers.CharField(required=True)
  uuidd = serializers.CharField(required=True)#si es int no deja en el view usarse concatenado en el query ._.
  apellido = serializers.CharField(required=False,default='s')
  edad = serializers.CharField(required=False,default='s')
  genero = serializers.CharField(required=False,default='False')
  correo = serializers.EmailField(required=False,default='s')
  codigo_pais = serializers.CharField(required=False,default='s')
  telefono = serializers.CharField(required=False,default='s')
  ciudad = serializers.CharField(required=False,default='s')
  estado = serializers.CharField(required=False,default='s')
  localidad = serializers.CharField(required=False,default='s')
  cp = serializers.CharField(required=False,default='s')

  def create(self,data):#es necesario, supongo para cuando no hay models
    return data
            
    
    

    
    
 


          
