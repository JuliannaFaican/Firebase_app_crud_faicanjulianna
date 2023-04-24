import { BdService } from './../../Services/bd.service';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Item } from 'src/Models/item';
import { FormsModule } from '@angular/forms';
import { ToastService } from 'src/Services/toast.service';
import { LoadingService } from 'src/Services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,FormsModule,CommonModule],
})
export class HomePage {
  private enlace:string = 'Comidas';
  public Comidas:Item[]=[];
  public newcomida:Item={
    codigo: '',
    nombre: '',
    precio: '',
    cal: 0,
    img: '',
    id: ''
  };
  constructor(private bd:BdService, private toast:ToastService, private load:LoadingService) {
  }
  ngOnInit() {
    this.bd.get<Item>(this.enlace).subscribe(p=>{
      this.Comidas=p;
    });
  }
  save(){
    //this.load.presentLoading();
    this.newcomida.id=this.bd.createId(this.enlace);
    const data = this.newcomida;
    this.bd.add<Item>(data,this.enlace,this.newcomida.id).then(()=>{
     // this.toast.showToast("Exito al guardar","success","checkbox-outline");
      //this.load.dismissLoading();
      this.clean();
    }).catch(()=>{
    //  this.toast.showToast("Error al guardar","danger","sad-outline");
    });
  }

  delete(p:Item){
    //this.load.presentLoading();
    this.bd.delete(this.enlace,p.id).then(()=>{
    //  this.toast.showToast("Exito al Borrar","success","trash-outline");
     // this.load.dismissLoading();
    }).catch(()=>{
      //this.toast.showToast("Error al Borrar","danger","sad-outline");
    });

  }

  clean(){
    this.newcomida.id="";
    this.newcomida.codigo="";
    this.newcomida.nombre="";
    this.newcomida.precio="";
    }
  }


