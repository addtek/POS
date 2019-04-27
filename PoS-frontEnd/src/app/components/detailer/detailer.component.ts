import { Component, OnInit } from '@angular/core';
import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussel sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

const transformer = (node: FoodNode, level: number) => {
  return {
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level: level,
  };
};
@Component({
  selector: 'app-detailer',
  templateUrl: './detailer.component.html',
  styleUrls: ['./detailer.component.sass']
})
export class DetailerComponent implements OnInit {
  treeFlattener = new MatTreeFlattener(transformer, node => node.level, node => node.expandable, node => node.children);
  treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    constructor() {
      this.dataSource.data = TREE_DATA;
    }
  ngOnInit() {
  }
hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
