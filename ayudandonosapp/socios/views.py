from django.shortcuts import render
from django.contrib.auth.mixins import LoginRequiredMixin 
from rest_framework import views, status, viewsets,mixins
import requests
from rest_framework.response import Response
from rest_framework.decorators import action
import json
from django.http import JsonResponse
from google.cloud import bigquery
from os import environ
import pandas
from rest_framework.generics import get_object_or_404
from .serializers import SocioSerializer



class SocioViewSet(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   mixins.DestroyModelMixin,
                   viewsets.GenericViewSet):


    lookup_field = 'socio_uiid'
    #environ["GOOGLE_APPLICATION_CREDENTIALS"] = "socios/ayudandonos-b212e7ac5839.json"
    environ["GOOGLE_APPLICATION_CREDENTIALS"] = "../ayudandonos-c1e786e1a5b5.json"
    client = bigquery.Client()
    
    serializer_class = SocioSerializer
 
    def list(self, request, *args, **kwargs):#se nec todos los params
        print('Cliente: ',self.client)
        query = "SELECT * FROM ayudandonos.Base_a.users"
        data_frame = self.client.query(query).result().to_dataframe()
        print(data_frame)
        print(len(data_frame))#del array!
        data_frame_ = data_frame.to_json()
        print(len(data_frame_))#de cada letra ._.
        status_ = 0
        if(len(data_frame)>0):
          status_ = 200
        else:
          status_ = 400

        if(status_ !=200):
          data_frame_ = 'sin datos!'
        
        respuesta = {'datos':data_frame_,
                      'status':status_
        }
        return Response(respuesta,status=status_)

    def retrieve(self, request, *args, **kwargs):
        
        socio_uiid = kwargs['socio_uiid']
        query = "SELECT * FROM ayudandonos.Base_a.users WHERE ID ="+socio_uiid
        data_frame = self.client.query(query).result().to_dataframe()
        data_frame_ = data_frame.to_json()

        status_ = 0
        if(len(data_frame)>0):
          status_ = 200
        else:
          status_ = 400
        
        if(status_!=200):
          data_frame_ = 'socio not found!'

        data = { 
            'info': data_frame_,
            'status': status_
        }
        
        return Response(data,status_)#JsonResponse =
    
    def get_object(self):#regresa un objeto: el user
      
      socio_uiid = self.kwargs['socio_uiid']
      query = "SELECT * FROM ayudandonos.Base_a.users WHERE ID ="+socio_uiid
      data_frame = self.client.query(query).result().to_dataframe()
      #print('data_frame: ',data_frame['Nombre'])
      if(len(data_frame)>0):
        return socio_uiid
      else:
        return 0 
    
    def update(self, request, *args, **kwargs): #perform_update: sobreescribe el nativo, error
      
      serializer = SocioSerializer(data=request.data)
      instancia = self.get_object()
      estatus = 0
      info = 0
      
      if(instancia!=0):
        #print('existe')
        #print('serializers: ',serializer)
        if serializer.is_valid():
          estatus = 200
          nombre = serializer.data['nombre']
          edad = serializer.data['edad']
          correo = serializer.data['correo']
          info = {
            "Nombre": nombre,
            "Edad": edad,
            "correo_electronico": correo
          }
          #inv como hacer el set dinamico:
          query = "UPDATE ayudandonos.Base_a.users SET Nombre='"+nombre+"' WHERE ID = "+instancia+";"
   
          #print('QUERY!: ',query)
          data_frame = self.client.query(query).result().to_dataframe()
          info = 'socio actualizado'
          #data_frame_ = data_frame.to_json()
          #print('data_frame: ',data_frame)#empty
          """ if(len(data_frame)>0):
            estatus = 200
            info = 'socio actualizado'
          else:
            estatus = 500 """

        else:
          estatus = 400
          info = 'datos no válidos'
      else:
        estatus = 404
        info = 'socio not found'
          
      data = {
        'status':estatus,
        'info':info
      }
      return Response(data,status=estatus)#JsonResponse = 

    def create(self, request, *args, **kwargs):

      serializer = SocioSerializer(data=request.data)
      estatus = 0
      info = 0

      if serializer.is_valid():
        uuidd = serializer.data['uuidd']
        nombre = serializer.data['nombre']
        edad = serializer.data['edad']
        apellido = serializer.data['apellido']
        genero = serializer.data['genero']
        correo = serializer.data['correo']
        codigo_pais = serializer.data['codigo_pais']
        telefono = serializer.data['telefono']
        ciudad = serializer.data['ciudad']
        estado = serializer.data['estado']
        localidad = serializer.data['localidad']
        cp = serializer.data['cp']

        #validar que el id, sea único:
        id_unico = "SELECT * FROM ayudandonos.Base_a.users WHERE ID ="+uuidd
        data_frame = self.client.query(id_unico).result().to_dataframe()
        print('existe: ',data_frame,len(data_frame))
        existe = False
        if(len(data_frame)>0):
          existe = True
        print(existe)
        
        if(existe):
          print('socio_id ya existe')
          info = 'socio_id ya existe'
          estatus = 400

        else:
          print('id unico, crear!')
          #query = "INSERT INTO ayudandonos.Base_a.users (ID,Nombre,Apellido,Edad,Genero,correo_electronico,telefono,ciudad,Estado,localidad,cp)"+
          query = "INSERT INTO ayudandonos.Base_a.users (ID,Nombre,Apellido,Edad,Genero,correo_electronico) VALUES ("+uuidd+",'"+nombre+"','"+apellido+"',"+edad+","+genero+",'"+correo+"')"
          print('query: ',query)
          data_frame = self.client.query(query).result().to_dataframe()
          data_frame_ = data_frame.to_json()
          print('socio_creado: ',data_frame,data_frame_)
          info = 'socio creado exitosamente!'
          estatus = 200
      data = {
        'estatus': estatus,
        'informacion': info
      }
      return Response(data,estatus)
