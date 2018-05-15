import React, { Component } from 'react'
import Insurance from '../build/contracts/Insurance.json'
import getWeb3 from './utils/getWeb3'
import * as flights from './flights.js'


import {Jumbotron, Button, Navbar, Nav, NavItem, MenuItem, NavDropdown, Well}  from 'react-bootstrap'
import {Switch, Route, Link} from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import { ic_flight_takeoff } from 'react-icons-kit/md/ic_flight_takeoff'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

var flightProof2 = '\x20\x00\x10\x00\xff\xff\x03\x00\x37\x5d\x38\x55\x17\x69\x05\x00\x04\xb5\x48\x55\x17\x69\x05\x00\x40\x00\x00\x00\x04\x00\x00\x00\x58\x62\xa0\x9a\xec\x1f\xf9\xd4\xa3\x4d\xd1\x98\x90\x04\x53\xd0\x81\x06\xe6\x87\xfa\xa2\x72\xe2\x21\x0d\x8c\x02\xc4\x5b\xe5\x2f\x59\xcf\x60\x70\x6c\xf1\x0d\x9c\x51\x82\x57\x67\x18\x7e\x26\xe0\x8f\x91\x37\x88\xb4\x98\x7b\x0a\xcb\x2a\x36\x26\x36\xeb\xb3\x1a\x02\xdb\x00\x00\x47\x45\x54\x20\x2f\x70\x72\x6f\x78\x79\x2e\x70\x79\x3f\x75\x72\x6c\x3d\x68\x74\x74\x70\x73\x25\x33\x41\x2f\x2f\x61\x70\x69\x2e\x66\x6c\x69\x67\x68\x74\x73\x74\x61\x74\x73\x2e\x63\x6f\x6d\x2f\x66\x6c\x65\x78\x2f\x66\x6c\x69\x67\x68\x74\x73\x74\x61\x74\x75\x73\x2f\x72\x65\x73\x74\x2f\x76\x32\x2f\x6a\x73\x6f\x6e\x2f\x66\x6c\x69\x67\x68\x74\x2f\x73\x74\x61\x74\x75\x73\x2f\x39\x35\x34\x38\x34\x31\x32\x36\x37\x25\x33\x46\x61\x70\x70\x49\x64\x25\x33\x44\x31\x64\x34\x37\x65\x30\x34\x32\x25\x32\x36\x61\x70\x70\x4b\x65\x79\x25\x33\x44\x61\x35\x62\x66\x65\x32\x61\x32\x35\x61\x31\x35\x66\x30\x35\x64\x62\x31\x35\x38\x38\x30\x38\x34\x65\x61\x32\x35\x36\x34\x37\x37\x20\x48\x54\x54\x50\x2f\x31\x2e\x31\x0d\x0a\x48\x6f\x73\x74\x3a\x20\x74\x6c\x73\x2d\x6e\x2e\x6f\x72\x67\x0d\x0a\x43\x6f\x6e\x6e\x65\x63\x74\x69\x6f\x6e\x3a\x20\x6b\x65\x65\x70\x2d\x61\x6c\x69\x76\x65\x0d\x0a\x0d\x0a\x5e\x3f\xa9\x71\xff\x3e\xdb\xe5\x8b\x47\x10\x07\x3b\xa4\x30\xdf\x02\xf9\x00\x01\x48\x54\x54\x50\x2f\x31\x2e\x31\x20\x32\x30\x30\x20\x4f\x4b\x0d\x0a\x44\x61\x74\x65\x3a\x20\x54\x68\x75\x2c\x20\x30\x35\x20\x41\x70\x72\x20\x32\x30\x31\x38\x20\x31\x30\x3a\x32\x33\x3a\x33\x38\x20\x47\x4d\x54\x0d\x0a\x53\x65\x72\x76\x65\x72\x3a\x20\x41\x70\x61\x63\x68\x65\x2f\x32\x2e\x34\x2e\x36\x20\x28\x52\x65\x64\x20\x48\x61\x74\x20\x45\x6e\x74\x65\x72\x70\x72\x69\x73\x65\x20\x4c\x69\x6e\x75\x78\x29\x20\x6d\x6f\x64\x5f\x6e\x73\x73\x2f\x31\x2e\x30\x2e\x31\x34\x20\x4e\x53\x53\x2f\x33\x2e\x33\x30\x2e\x31\x20\x4f\x70\x65\x6e\x53\x53\x4c\x2f\x31\x2e\x30\x2e\x32\x6b\x2d\x66\x69\x70\x73\x20\x50\x48\x50\x2f\x35\x2e\x34\x2e\x31\x36\x0d\x0a\x43\x6f\x6e\x6e\x65\x63\x74\x69\x6f\x6e\x3a\x20\x63\x6c\x6f\x73\x65\x0d\x0a\x43\x6f\x6e\x74\x65\x6e\x74\x2d\x4c\x65\x6e\x67\x74\x68\x3a\x20\x32\x39\x36\x34\x0d\x0a\x43\x6f\x6e\x74\x65\x6e\x74\x2d\x54\x79\x70\x65\x3a\x20\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x6a\x73\x6f\x6e\x3b\x63\x68\x61\x72\x73\x65\x74\x3d\x55\x54\x46\x2d\x38\x0d\x0a\x0d\x0a\x12\x87\x2a\xf3\xa3\xbb\xce\x66\x87\xf0\x6a\x74\xc1\xdb\x9f\xfe\x02\x94\x0b\x01\x7b\x22\x72\x65\x71\x75\x65\x73\x74\x22\x3a\x7b\x22\x66\x6c\x69\x67\x68\x74\x49\x64\x22\x3a\x7b\x22\x72\x65\x71\x75\x65\x73\x74\x65\x64\x22\x3a\x22\x39\x35\x34\x38\x34\x31\x32\x36\x37\x22\x2c\x22\x69\x6e\x74\x65\x72\x70\x72\x65\x74\x65\x64\x22\x3a\x39\x35\x34\x38\x34\x31\x32\x36\x37\x7d\x2c\x22\x65\x78\x74\x65\x6e\x64\x65\x64\x4f\x70\x74\x69\x6f\x6e\x73\x22\x3a\x7b\x7d\x2c\x22\x75\x72\x6c\x22\x3a\x22\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x66\x6c\x69\x67\x68\x74\x73\x74\x61\x74\x73\x2e\x63\x6f\x6d\x2f\x66\x6c\x65\x78\x2f\x66\x6c\x69\x67\x68\x74\x73\x74\x61\x74\x75\x73\x2f\x72\x65\x73\x74\x2f\x76\x32\x2f\x6a\x73\x6f\x6e\x2f\x66\x6c\x69\x67\x68\x74\x2f\x73\x74\x61\x74\x75\x73\x2f\x39\x35\x34\x38\x34\x31\x32\x36\x37\x22\x7d\x2c\x22\x61\x70\x70\x65\x6e\x64\x69\x78\x22\x3a\x7b\x22\x61\x69\x72\x6c\x69\x6e\x65\x73\x22\x3a\x5b\x7b\x22\x66\x73\x22\x3a\x22\x41\x41\x22\x2c\x22\x69\x61\x74\x61\x22\x3a\x22\x41\x41\x22\x2c\x22\x69\x63\x61\x6f\x22\x3a\x22\x41\x41\x4c\x22\x2c\x22\x6e\x61\x6d\x65\x22\x3a\x22\x41\x6d\x65\x72\x69\x63\x61\x6e\x20\x41\x69\x72\x6c\x69\x6e\x65\x73\x22\x2c\x22\x70\x68\x6f\x6e\x65\x4e\x75\x6d\x62\x65\x72\x22\x3a\x22\x30\x38\x34\x35\x37\x2d\x35\x36\x37\x2d\x35\x36\x37\x22\x2c\x22\x61\x63\x74\x69\x76\x65\x22\x3a\x74\x72\x75\x65\x7d\x2c\x7b\x22\x66\x73\x22\x3a\x22\x4a\x4a\x22\x2c\x22\x69\x61\x74\x61\x22\x3a\x22\x4a\x4a\x22\x2c\x22\x69\x63\x61\x6f\x22\x3a\x22\x54\x41\x4d\x22\x2c\x22\x6e\x61\x6d\x65\x22\x3a\x22\x4c\x41\x54\x41\x4d\x20\x41\x69\x72\x6c\x69\x6e\x65\x73\x20\x42\x72\x61\x73\x69\x6c\x22\x2c\x22\x70\x68\x6f\x6e\x65\x4e\x75\x6d\x62\x65\x72\x22\x3a\x22\x31\x2d\x38\x38\x38\x2d\x32\x46\x4c\x59\x20\x54\x41\x4d\x22\x2c\x22\x61\x63\x74\x69\x76\x65\x22\x3a\x74\x72\x75\x65\x7d\x2c\x7b\x22\x66\x73\x22\x3a\x22\x42\x41\x22\x2c\x22\x69\x61\x74\x61\x22\x3a\x22\x42\x41\x22\x2c\x22\x69\x63\x61\x6f\x22\x3a\x22\x42\x41\x57\x22\x2c\x22\x6e\x61\x6d\x65\x22\x3a\x22\x42\x72\x69\x74\x69\x73\x68\x20\x41\x69\x72\x77\x61\x79\x73\x22\x2c\x22\x70\x68\x6f\x6e\x65\x4e\x75\x6d\x62\x65\x72\x22\x3a\x22\x31\x2d\x38\x30\x30\x2d\x41\x49\x52\x57\x41\x59\x53\x22\x2c\x22\x61\x63\x74\x69\x76\x65\x22\x3a\x74\x72\x75\x65\x7d\x5d\x2c\x22\x61\x69\x72\x70\x6f\x72\x74\x73\x22\x3a\x5b\x7b\x22\x66\x73\x22\x3a\x22\x4c\x59\x53\x22\x2c\x22\x69\x61\x74\x61\x22\x3a\x22\x4c\x59\x53\x22\x2c\x22\x69\x63\x61\x6f\x22\x3a\x22\x4c\x46\x4c\x4c\x22\x2c\x22\x6e\x61\x6d\x65\x22\x3a\x22\x4c\x79\x6f\x6e\x20\x53\x61\x69\x6e\x74\x2d\x45\x78\x75\x70\x65\x72\x79\x20\x49\x6e\x74\x65\x72\x6e\x61\x74\x69\x6f\x6e\x61\x6c\x20\x41\x69\x72\x70\x6f\x72\x74\x22\x2c\x22\x63\x69\x74\x79\x22\x3a\x22\x4c\x79\x6f\x6e\x22\x2c\x22\x63\x69\x74\x79\x43\x6f\x64\x65\x22\x3a\x22\x4c\x59\x53\x22\x2c\x22\x63\x6f\x75\x6e\x74\x72\x79\x43\x6f\x64\x65\x22\x3a\x22\x46\x52\x22\x2c\x22\x63\x6f\x75\x6e\x74\x72\x79\x4e\x61\x6d\x65\x22\x3a\x22\x46\x72\x61\x6e\x63\x65\x22\x2c\x22\x72\x65\x67\x69\x6f\x6e\x4e\x61\x6d\x65\x22\x3a\x22\x45\x75\x72\x6f\x70\x65\x22\x2c\x22\x74\x69\x6d\x65\x5a\x6f\x6e\x65\x52\x65\x67\x69\x6f\x6e\x4e\x61\x6d\x65\x22\x3a\x22\x45\x75\x72\x6f\x70\x65\x2f\x50\x61\x72\x69\x73\x22\x2c\x22\x6c\x6f\x63\x61\x6c\x54\x69\x6d\x65\x22\x3a\x22\x32\x30\x31\x38\x2d\x30\x34\x2d\x30\x35\x54\x31\x32\x3a\x32\x33\x3a\x33\x39\x2e\x34\x36\x37\x22\x2c\x22\x75\x74\x63\x4f\x66\x66\x73\x65\x74\x48\x6f\x75\x72\x73\x22\x3a\x32\x2e\x30\x2c\x22\x6c\x61\x74\x69\x74\x75\x64\x65\x22\x3a\x34\x35\x2e\x37\x32\x31\x34\x32\x36\x2c\x22\x6c\x6f\x6e\x67\x69\x74\x75\x64\x65\x22\x3a\x35\x2e\x30\x38\x30\x33\x33\x34\x2c\x22\x65\x6c\x65\x76\x61\x74\x69\x6f\x6e\x46\x65\x65\x74\x22\x3a\x38\x32\x31\x2c\x22\x63\x6c\x61\x73\x73\x69\x66\x69\x63\x61\x74\x69\x6f\x6e\x22\x3a\x32\x2c\x22\x61\x63\x74\x69\x76\x65\x22\x3a\x74\x72\x75\x65\x2c\x22\x64\x65\x6c\x61\x79\x49\x6e\x64\x65\x78\x55\x72\x6c\x22\x3a\x22\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x66\x6c\x69\x67\x68\x74\x73\x74\x61\x74\x73\x2e\x63\x6f\x6d\x2f\x66\x6c\x65\x78\x2f\x64\x65\x6c\x61\x79\x69\x6e\x64\x65\x78\x2f\x72\x65\x73\x74\x2f\x76\x31\x2f\x6a\x73\x6f\x6e\x2f\x61\x69\x72\x70\x6f\x72\x74\x73\x2f\x4c\x59\x53\x3f\x63\x6f\x64\x65\x54\x79\x70\x65\x3d\x66\x73\x22\x2c\x22\x77\x65\x61\x74\x68\x65\x72\x55\x72\x6c\x22\x3a\x22\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x66\x6c\x69\x67\x68\x74\x73\x74\x61\x74\x73\x2e\x63\x6f\x6d\x2f\x66\x6c\x65\x78\x2f\x77\x65\x61\x74\x68\x65\x72\x2f\x72\x65\x73\x74\x2f\x76\x31\x2f\x6a\x73\x6f\x6e\x2f\x61\x6c\x6c\x2f\x4c\x59\x53\x3f\x63\x6f\x64\x65\x54\x79\x70\x65\x3d\x66\x73\x22\x7d\x2c\x7b\x22\x66\x73\x22\x3a\x22\x4c\x48\x52\x22\x2c\x22\x69\x61\x74\x61\x22\x3a\x22\x4c\x48\x52\x22\x2c\x22\x69\x63\x61\x6f\x22\x3a\x22\x45\x47\x4c\x4c\x22\x2c\x22\x6e\x61\x6d\x65\x22\x3a\x22\x4c\x6f\x6e\x64\x6f\x6e\x20\x48\x65\x61\x74\x68\x72\x6f\x77\x20\x41\x69\x72\x70\x6f\x72\x74\x22\x2c\x22\x63\x69\x74\x79\x22\x3a\x22\x4c\x6f\x6e\x64\x6f\x6e\x22\x2c\x22\x63\x69\x74\x79\x43\x6f\x64\x65\x22\x3a\x22\x4c\x4f\x4e\x22\x2c\x22\x73\x74\x61\x74\x65\x43\x6f\x64\x65\x22\x3a\x22\x45\x4e\x22\x2c\x22\x63\x6f\x75\x6e\x74\x72\x79\x43\x6f\x64\x65\x22\x3a\x22\x47\x42\x22\x2c\x22\x63\x6f\x75\x6e\x74\x72\x79\x4e\x61\x6d\x65\x22\x3a\x22\x55\x6e\x69\x74\x65\x64\x20\x4b\x69\x6e\x67\x64\x6f\x6d\x22\x2c\x22\x72\x65\x67\x69\x6f\x6e\x4e\x61\x6d\x65\x22\x3a\x22\x45\x75\x72\x6f\x70\x65\x22\x2c\x22\x74\x69\x6d\x65\x5a\x6f\x6e\x65\x52\x65\x67\x69\x6f\x6e\x4e\x61\x6d\x65\x22\x3a\x22\x45\x75\x72\x6f\x70\x65\x2f\x4c\x6f\x6e\x64\x6f\x6e\x22\x2c\x22\x6c\x6f\x63\x61\x6c\x54\x69\x6d\x65\x22\x3a\x22\x32\x30\x31\x38\x2d\x30\x34\x2d\x30\x35\x54\x31\x31\x3a\x32\x33\x3a\x33\x39\x2e\x34\x36\x37\x22\x2c\x22\x75\x74\x63\x4f\x66\x66\x73\x65\x74\x48\x6f\x75\x72\x73\x22\x3a\x31\x2e\x30\x2c\x22\x6c\x61\x74\x69\x74\x75\x64\x65\x22\x3a\x35\x31\x2e\x34\x36\x39\x36\x30\x33\x2c\x22\x6c\x6f\x6e\x67\x69\x74\x75\x64\x65\x22\x3a\x2d\x30\x2e\x34\x35\x33\x35\x36\x36\x2c\x22\x65\x6c\x65\x76\x61\x74\x69\x6f\x6e\x46\x65\x65\x74\x22\x3a\x38\x30\x2c\x22\x63\x6c\x61\x73\x73\x69\x66\x69\x63\x61\x74\x69\x6f\x6e\x22\x3a\x31\x2c\x22\x61\x63\x74\x69\x76\x65\x22\x3a\x74\x72\x75\x65\x2c\x22\x64\x65\x6c\x61\x79\x49\x6e\x64\x65\x78\x55\x72\x6c\x22\x3a\x22\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x66\x6c\x69\x67\x68\x74\x73\x74\x61\x74\x73\x2e\x63\x6f\x6d\x2f\x66\x6c\x65\x78\x2f\x64\x65\x6c\x61\x79\x69\x6e\x64\x65\x78\x2f\x72\x65\x73\x74\x2f\x76\x31\x2f\x6a\x73\x6f\x6e\x2f\x61\x69\x72\x70\x6f\x72\x74\x73\x2f\x4c\x48\x52\x3f\x63\x6f\x64\x65\x54\x79\x70\x65\x3d\x66\x73\x22\x2c\x22\x77\x65\x61\x74\x68\x65\x72\x55\x72\x6c\x22\x3a\x22\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x66\x6c\x69\x67\x68\x74\x73\x74\x61\x74\x73\x2e\x63\x6f\x6d\x2f\x66\x6c\x65\x78\x2f\x77\x65\x61\x74\x68\x65\x72\x2f\x72\x65\x73\x74\x2f\x76\x31\x2f\x6a\x73\x6f\x6e\x2f\x61\x6c\x6c\x2f\x4c\x48\x52\x3f\x63\x6f\x64\x65\x54\x79\x70\x65\x3d\x66\x73\x22\x7d\x5d\x2c\x22\x65\x71\x75\x69\x70\x6d\x65\x6e\x74\x73\x22\x3a\x5b\x7b\x22\x69\x61\x74\x61\x22\x3a\x22\x33\x32\x30\x22\x2c\x22\x6e\x61\x6d\x65\x22\x3a\x22\x41\x69\x72\x62\x75\x73\x20\x41\x33\x32\x30\x22\x2c\x22\x74\x75\x72\x62\x6f\x50\x72\x6f\x70\x22\x3a\x66\x61\x6c\x73\x65\x2c\x22\x6a\x65\x74\x22\x3a\x74\x72\x75\x65\x2c\x22\x77\x69\x64\x65\x62\x6f\x64\x79\x22\x3a\x66\x61\x6c\x73\x65\x2c\x22\x72\x65\x67\x69\x6f\x6e\x61\x6c\x22\x3a\x66\x61\x6c\x73\x65\x7d\x5d\x7d\x2c\x22\x66\x6c\x69\x67\x68\x74\x53\x74\x61\x74\x75\x73\x22\x3a\x7b\x22\x66\x6c\x69\x67\x68\x74\x49\x64\x22\x3a\x39\x35\x34\x38\x34\x31\x32\x36\x37\x2c\x22\x63\x61\x72\x72\x69\x65\x72\x46\x73\x43\x6f\x64\x65\x22\x3a\x22\x42\x41\x22\x2c\x22\x66\x6c\x69\x67\x68\x74\x4e\x75\x6d\x62\x65\x72\x22\x3a\x22\x33\x36\x32\x22\x2c\x22\x64\x65\x70\x61\x72\x74\x75\x72\x65\x41\x69\x72\x70\x6f\x72\x74\x46\x73\x43\x6f\x64\x65\x22\x3a\x22\x4c\x48\x52\x22\x2c\x22\x61\x72\x72\x69\x76\x61\x6c\x41\x69\x72\x70\x6f\x72\x74\x46\x73\x43\x6f\x64\x65\x22\x3a\x22\x4c\x59\x53\x22\x2c\x22\x64\x65\x70\x61\x72\x74\x75\x72\x65\x44\x61\x74\x65\x22\x3a\x7b\x22\x64\x61\x74\x65\x4c\x6f\x63\x61\x6c\x22\x3a\x22\x32\x30\x31\x38\x2d\x30\x34\x2d\x30\x35\x54\x31\x33\x3a\x35\x30\x3a\x30\x30\x2e\x30\x30\x30\x22\x2c\x22\x64\x61\x74\x65\x55\x74\x63\x22\x3a\x22\x32\x30\x31\x38\x2d\x30\x34\x2d\x30\x35\x54\x31\x32\x3a\x35\x30\x3a\x30\x30\x2e\x30\x30\x30\x5a\x22\x7d\x2c\x22\x61\x72\x72\x69\x76\x61\x6c\x44\x61\x74\x65\x22\x3a\x7b\x22\x64\x61\x74\x65\x4c\x6f\x63\x61\x6c\x22\x3a\x22\x32\x30\x31\x38\x2d\x30\x34\x2d\x30\x35\x54\x31\x36\x3a\x33\x30\x3a\x30\x30\x2e\x30\x30\x30\x22\x2c\x22\x64\x61\x74\x65\x55\x74\x63\x22\x3a\x22\x32\x30\x31\x38\x2d\x30\x34\x2d\x30\x35\x54\x31\x34\x3a\x33\x30\x3a\x30\x30\x2e\x30\x30\x30\x5a\x22\x7d\x2c\x22\x73\x74\x61\x74\x75\x73\x22\x3a\x22\x53\x22\x2c\x22\x73\x63\x68\x65\x64\x75\x6c\x65\x22\x3a\x7b\x22\x66\x6c\x69\x67\x68\x74\x54\x79\x70\x65\x22\x3a\x22\x4a\x22\x2c\x22\x73\x65\x72\x76\x69\x63\x65\x43\x6c\x61\x73\x73\x65\x73\x22\x3a\x22\x52\x46\x4a\x59\x22\x2c\x22\x72\x65\x73\x74\x72\x69\x63\x74\x69\x6f\x6e\x73\x22\x3a\x22\x22\x7d\x2c\x22\x6f\x70\x65\x72\x61\x74\x69\x6f\x6e\x61\x6c\x54\x69\x6d\x65\x73\x22\x3a\x7b\x22\x70\x75\x62\x6c\x69\x73\x68\x65\x64\x44\x65\x70\x61\x72\x74\x75\x72\x65\x22\x3a\x7b\x22\x64\x61\x74\x65\x4c\x6f\x63\x61\x6c\x22\x3a\x22\x32\x30\x31\x38\x2d\x30\x34\x2d\x30\x35\x54\x31\x33\x3a\x35\x30\x3a\x30\x30\x2e\x30\x30\x30\x22\x2c\x22\x64\x61\x74\x65\x55\x74\x63\x22\x3a\x22\x32\x30\x31\x38\x2d\x30\x34\x2d\x30\x35\x54\x31\x32\x3a\x35\x30\x3a\x30\x30\x2e\x30\x30\x30\x5a\x22\x7d\x2c\x22\x70\x75\x62\x6c\x69\x73\x68\x65\x64\x41\x72\x72\x69\x76\x61\x6c\x22\x3a\x7b\x22\x64\x61\x74\x65\x4c\x6f\x63\x61\x6c\x22\x3a\x22\x32\x30\x31\x38\x2d\x30\x34\x2d\x30\x35\x54\x31\x36\x3a\x33\x30\x3a\x30\x30\x2e\x30\x30\x30\x22\x2c\x22\x64\x61\x74\x65\x55\x74\x63\x22\x3a\x22\x32\x30\x31\x38\x2d\x30\x34\x2d\x30\x35\x54\x31\x34\x3a\x33\x30\x3a\x30\x30\x2e\x30\x30\x30\x5a\x22\x7d\x2c\x22\x73\x63\x68\x65\x64\x75\x6c\x65\x64\x47\x61\x74\x65\x44\x65\x70\x61\x72\x74\x75\x72\x65\x22\x3a\x7b\x22\x64\x61\x74\x65\x4c\x6f\x63\x61\x6c\x22\x3a\x22\x32\x30\x31\x38\x2d\x30\x34\x2d\x30\x35\x54\x31\x33\x3a\x35\x30\x3a\x30\x30\x2e\x30\x30\x30\x22\x2c\x22\x64\x61\x74\x65\x55\x74\x63\x22\x3a\x22\x32\x30\x31\x38\x2d\x30\x34\x2d\x30\x35\x54\x31\x32\x3a\x35\x30\x3a\x30\x30\x2e\x30\x30\x30\x5a\x22\x7d\x2c\x22\x73\x63\x68\x65\x64\x75\x6c\x65\x64\x47\x61\x74\x65\x41\x72\x72\x69\x76\x61\x6c\x22\x3a\x7b\x22\x64\x61\x74\x65\x4c\x6f\x63\x61\x6c\x22\x3a\x22\x32\x30\x31\x38\x2d\x30\x34\x2d\x30\x35\x54\x31\x36\x3a\x33\x30\x3a\x30\x30\x2e\x30\x30\x30\x22\x2c\x22\x64\x61\x74\x65\x55\x74\x63\x22\x3a\x22\x32\x30\x31\x38\x2d\x30\x34\x2d\x30\x35\x54\x31\x34\x3a\x33\x30\x3a\x30\x30\x2e\x30\x30\x30\x5a\x22\x7d\x7d\x2c\x22\x63\x6f\x64\x65\x73\x68\x61\x72\x65\x73\x22\x3a\x5b\x7b\x22\x66\x73\x43\x6f\x64\x65\x22\x3a\x22\x41\x41\x22\x2c\x22\x66\x6c\x69\x67\x68\x74\x4e\x75\x6d\x62\x65\x72\x22\x3a\x22\x36\x34\x38\x37\x22\x2c\x22\x72\x65\x6c\x61\x74\x69\x6f\x6e\x73\x68\x69\x70\x22\x3a\x22\x4c\x22\x7d\x2c\x7b\x22\x66\x73\x43\x6f\x64\x65\x22\x3a\x22\x4a\x4a\x22\x2c\x22\x66\x6c\x69\x67\x68\x74\x4e\x75\x6d\x62\x65\x72\x22\x3a\x22\x32\x37\x38\x35\x22\x2c\x22\x72\x65\x6c\x61\x74\x69\x6f\x6e\x73\x68\x69\x70\x22\x3a\x22\x4c\x22\x7d\x5d\x2c\x22\x66\x6c\x69\x67\x68\x74\x44\x75\x72\x61\x74\x69\x6f\x6e\x73\x22\x3a\x7b\x22\x73\x63\x68\x65\x64\x75\x6c\x65\x64\x42\x6c\x6f\x63\x6b\x4d\x69\x6e\x75\x74\x65\x73\x22\x3a\x31\x30\x30\x7d\x2c\x22\x61\x69\x72\x70\x6f\x72\x74\x52\x65\x73\x6f\x75\x72\x63\x65\x73\x22\x3a\x7b\x22\x64\x65\x70\x61\x72\x74\x75\x72\x65\x54\x65\x72\x6d\x69\x6e\x61\x6c\x22\x3a\x22\x33\x22\x2c\x22\x61\x72\x72\x69\x76\x61\x6c\x54\x65\x72\x6d\x69\x6e\x61\x6c\x22\x3a\x22\x54\x31\x41\x22\x7d\x2c\x22\x66\x6c\x69\x67\x68\x74\x45\x71\x75\x69\x70\x6d\x65\x6e\x74\x22\x3a\x7b\x22\x73\x63\x68\x65\x64\x75\x6c\x65\x64\x45\x71\x75\x69\x70\x6d\x65\x6e\x74\x49\x61\x74\x61\x43\x6f\x64\x65\x22\x3a\x22\x33\x32\x30\x22\x2c\x22\x61\x63\x74\x75\x61\x6c\x45\x71\x75\x69\x70\x6d\x65\x6e\x74\x49\x61\x74\x61\x43\x6f\x64\x65\x22\x3a\x22\x33\x32\x30\x22\x7d\x7d\x7d\xc5\x85\xfd\x47\x90\x8f\x6f\x8d\x5b\x1c\xb3\x73\x75\xd4\x15\xa8';

// Object to hold data on insurances for client-side use
class InsurancePolicy {
    constructor(id, proposer, numProviders, totalCoverAmount, currentFundedCover, premium, flightId, filled, deleted, contributors, contributions) {
	this.id = id;
	this.proposer = proposer
	this.numProviders = numProviders
	this.totalCoverAmount = totalCoverAmount
	this.currentFundedCover = currentFundedCover
	this.premium = premium
	this.flightId = flightId
	this.filled = filled
	this.deleted = deleted
	this.contributors = contributors
	this.contributions = contributions
    }
}

// React component that dislpays an Insurance Policy object
class InsurancePolicyView extends Component {
    constructor(props) {
	super(props)
    }
    render() {
	// A function that creates the desired styling for a column
	var pStyle = function(width) {
	    return {display:"inline-block", width:width+"px", "text-align":"center"}
	}
	return ( <div>
		 <p style={pStyle(this.props.idWidth)}>{this.props.insurance.id}</p><p style={pStyle(this.props.coverWidth)}>{this.props.insurance.currentFundedCover}/{this.props.insurance.totalCoverAmount}</p><p style={pStyle(this.props.premiumWidth)}>{this.props.insurance.premium}</p> <this.props.actionComponent insurance={this.props.insurance}/>
		 </div> )
    }
}

// React component that displays a list of Insurance Policy View components (see above)
class InsurancePolicyList extends Component {
    constructor(props) {
	super(props)
    }
    render() {
	// Column widths (in pixels)
	var idWidth = 80;
	var coverWidth = 130;
	var premiumWidth = 120;
	// Function that creates the appropriate styling for column headers
	var headerStyle = function(width) {
	    return {display:"inline-block", width:width+"px", "text-align":"center"}
	}
	// If there are no insurances to display, give an error message
	if (this.props.insurances.length == 0) {
	    return ( <h4>No insurances available </h4>)
	}
	// Otherwise return JSX with column widths and map every insurance to an InsurancePolicyView component
	return (
		<div>
		<h2>{this.props.header}</h2>
		<h4 style={headerStyle(idWidth)}>ID</h4>
		<h4 style={headerStyle(coverWidth)}>Cover</h4>
		<h4 style={headerStyle(premiumWidth)}>Premium</h4>
	    {this.props.insurances.map( function(insurance) {
		return <InsurancePolicyView key={insurance.id} idWidth={idWidth} coverWidth={coverWidth} premiumWidth={premiumWidth} insurance={insurance} actionComponent={this.props.actionComponent}/>
		}.bind(this))}
	    </div>
	)
    }
}

// A React component for creating new insurance policie
class InsurancePolicyCreator extends Component {
    constructor(props) {
	super(props)
	this.state = {premium:0, cover:0, flight:null, proof:null}
    }
    // Try to parse a number and if succesful, set it as the cover amount
    setCover(cover) {
	var notNum = isNaN(cover)
	if (!notNum) {
	    this.setState({cover:cover})
	}
    }
    // Try to parse a number out and if succesful, set it as the premium amount
    setPremium(premium) {
	var notNum = isNaN(premium)
	if (!notNum) {
	    this.setState({premium:premium})
	}
    }
    setFlight(flight) {
	console.log(flight)
	this.setState({flight:flight})
    }
    render() {
	var proof =  flights.getFlight(959212228).then(function(f) {return f.proof})
	return (
		<div>
		<div style={{display:"inline-block"}}>
		<flights.FlightSelector selectFlight={this.setFlight.bind(this)}/>
		<p>I want to be covered to the sum of:</p>
		<input style={{width:"120px", margin:"0px 20px 0px 0px"}} onChange={(e) => {this.setCover(e.target.value)} }></input>
		<p style={{display:"inline-block"}}>{this.state.cover}</p>
		<p>I will pay a premium of:</p>
		<input style={{width:"120px", margin:"0px 20px 0px 0px"}} onChange={(e) => {this.setPremium(e.target.value)} }></input>
		<p style={{display:"inline-block"}}>{this.state.premium}</p>
		{this.state.flight ? <button style={{display:"block"}} onClick={() => this.props.addInsurance(this.state.premium, this.state.cover, this.state.proof)}>Add Insurance Policy On Flight Number {this.state.flight.flightNumber}</button> : <button onClick={() => this.props.addInsurance(this.state.premium, this.state.cover, proof)}>DELETE THIS</button>}
		</div>
	    </div>
	)
    }
}

// Main app that runs everything
class App extends Component {
    constructor(props) {
	super(props)

	this.state = {
	    storageValue: 0,
	    web3: null,
	    userUnfilledInsurances: [],
	    userFilledInsurances: [],
	    availableInsurances: [],
	    investedInsurance: []
	}
    }

    componentWillMount() {
	// Get network provider and web3 instance.
	// See utils/getWeb3 for more info.

	getWeb3
	    .then(results => {
		this.setState({
		    web3: results.web3
		})

		// Instantiate contract once web3 provided.
		this.instantiateContract()
	    })
	    .catch(() => {
		console.log('Error finding web3.')
	    }).then( (result) => {
		// Instantiate contract once web3 provided.
		console.log("getting contract")
		return this.getContract()
	    }).then( (result) => {
		// Callback to re-populate bets after changes
		var getInsurances = function() {
		    console.log("insurance change event triggered")
		    this.getAllInsurances()
		}.bind(this)
		// Start watching for event with above callback
		this.event = this.insuranceContractInst.InsuranceCoverChange()
		return this.event.watch(getInsurances)
	    }).then( (result) => {
		// Create a function that regularly checks for changes to account
		this.currAccount = this.state.web3.eth.accounts[0]
		console.log(this.currAccount, this.state.web3.eth.accounts)
		// Update the current account regularly
		this.getCurrAccount = function() {
		    if (this.state.web3.eth.accounts[0] !== this.currAccount) {
			this.currAccount = this.state.web3.eth.accounts[0];
			this.getAllInsurances()
		    }
		}.bind(this)
		setInterval(this.getCurrAccount, 100)
		return this.getAllInsurances()
	    })
    }

    async getContract() {
	console.log("getting contract")
	const contract = require('truffle-contract')
	this.insuranceContract = contract(Insurance)
	this.insuranceContract.setProvider(this.state.web3.currentProvider)
	this.insuranceContractInst = await this.insuranceContract.deployed()
    }

    async getAllInsurances() {
	console.log("got all insurances");
	// Get the insurance Ids
	var insuranceIds = await this.insuranceContractInst.getInsuranceContracts()
	console.log(insuranceIds);
	var userFilledInsurances = []
	var userUnfilledInsurances = []
	var availableInsurances = []
	var investedInsurance = []
	var  p =0
	// Cycle over the ids
	console.log(insuranceIds.length)
	for (var i = 0; i < insuranceIds.length; i++) {
	    console.log(i, insuranceIds.length, p++)
	    // Get the insurance object (represented as array) and the contributors array
	    var insurance = await this.insuranceContractInst.allInsuranceCovers(insuranceIds[i])
	    var contributors = await this.insuranceContractInst.getInsuranceContributors(insuranceIds[i])
	    var contributions = await this.insuranceContractInst.getInsuranceContributions(insuranceIds[i])
	    insurance.push(contributors)
	    console.log(contributors)
	    insurance.push(contributions)
	    // Convert the insurance array to a javascript object
	    insurance = this.convertInsurance(insurance)
	    if (insurance.deleted === false) {
		// If the insurance has not been deleted
		if (insurance.proposer === this.currAccount) {
		    // and if it was proposed by the current user
		    if (insurance.filled) {
			// and if it is already filled, append it to the users funded Insurances
			userFilledInsurances.push(insurance)
		    }
		    else {
			//  and if it is not filled, apprent to users unfunded Insurances
			userUnfilledInsurances.push(insurance)
		    }
		}
		else {
		    // If it was proposed by a different user, work out whether the current user has contributed
		    var contributor = false
		    for (var j = 0; j < insurance.contributors.length; j++) {
			if (insurance.contributors[j] == this.currAccount) {
			    contributor = true
			    break
			}
		    }
		    console.log(contributor, insurance.contributors, insurance)
		    if (contributor == true && insurance.filled == true) {
			// If he has and it is filled, add it to the invest insurance list
			investedInsurance.push(insurance)
			console.log("inv", investedInsurance)
		    }
		    else if (insurance.filled == false) {
			// If it isnt filled, add it to the avaialble list
			availableInsurances.push(insurance)
		    }
		}
	    }
	}
	this.setState({userFilledInsurances: userFilledInsurances, userUnfilledInsurances:userUnfilledInsurances, availableInsurances: availableInsurances, investedInsurance: investedInsurance})
    }

    // Function to convert insurance from solidity form to a javscript form
    convertInsurance(insuranceArr) {
	var id = insuranceArr[0].toNumber()
	var proposer = insuranceArr[1]
	var numProviders = insuranceArr[2].toNumber()
	var totalCoverAmount = this.state.web3.fromWei(insuranceArr[3].toNumber(), "ether")
	var currentFundedCover = this.state.web3.fromWei(insuranceArr[4].toNumber(), "ether")
	var premium = this.state.web3.fromWei(insuranceArr[5].toNumber(), "ether")
	var flightId = insuranceArr[6].toNumber()
	var filled = insuranceArr[7]
	var deleted = insuranceArr[8]
	var contributors = insuranceArr[9]
	var contributions = insuranceArr[10]
	for (var i = 0; i < contributions.length; i++) {
	    contributions[i] = this.state.web3.fromWei(contributions[i].toNumber(), "ether")
	}
	var insurance = new InsurancePolicy(id, proposer, numProviders, totalCoverAmount, currentFundedCover, premium, flightId, filled, deleted, contributors, contributions);
	return insurance
    }

    // Function to add a new insurance to the blockchain
    async addNewInsurance(premium, cover, flightProof) {
	console.log("adding new insurance");
	var totalCoverAmount = this.state.web3.toWei(cover, "ether")
	var premiumAmount = this.state.web3.toWei(premium, "ether")
	var proposer = this.currAccount
	flightProof = "0x20001000ffff0300529b19692e6c0500bdd026692e6c05004000000004000000623a3fbd2c3f2dae01e3d07ff8744029d4cf77b49b548ed5ce46b66e1e8c96dc26254e04b7bb5712ab487c6df84ad79f9767e361f6f19d443528678d2134eec802aa0000474554202f70726f78792e70793f75726c3d68747470732533412f2f666c6967687473746174732e676c697463682e6d652f666c65782f666c696768747374617475732f726573742f76322f6a736f6e2f666c696768742f7374617475732f39353930323234373220485454502f312e310d0a486f73743a20746c7370726f6f662e6261737469656e2e746563680d0a436f6e6e656374696f6e3a206b6565702d616c6976650d0a0d0ad128099128119851a9911d74850e28a802e60001485454502f312e3120323030204f4b0d0a446174653a204d6f6e2c203134204d617920323031382031383a31313a313120474d540d0a5365727665723a204170616368652f322e342e313820285562756e7475290d0a436f6e6e656374696f6e3a20636c6f73650d0a782d706f77657265642d62793a20457870726573730d0a6163636573732d636f6e74726f6c2d616c6c6f772d6f726967696e3a202a0d0a436f6e74656e742d4c656e6774683a20333139380d0a436f6e74656e742d547970653a206170706c69636174696f6e2f6a736f6e3b636861727365743d5554462d380d0a0d0aaaf8d322f2cd5af521b2f2ebfdffec13027e0c017b2272657175657374223a7b22666c696768744964223a7b22726571756573746564223a22393539303232343732222c22696e746572707265746564223a3935393032323437327d2c22657874656e6465644f7074696f6e73223a7b7d2c2275726c223a2268747470733a2f2f6170692e666c6967687473746174732e636f6d2f666c65782f666c696768747374617475732f726573742f76322f6a736f6e2f666c696768742f7374617475732f393539303232343732227d2c22617070656e646978223a7b226169726c696e6573223a5b7b226673223a223455222c2269617461223a223455222c226963616f223a22475749222c226e616d65223a224765726d616e77696e6773222c2270686f6e654e756d626572223a222b3434202830292038373020323532203132203530222c22616374697665223a747275657d2c7b226673223a225541222c2269617461223a225541222c226963616f223a2255414c222c226e616d65223a22556e69746564204169726c696e6573222c2270686f6e654e756d626572223a22312d3830302d3836342d38333331222c22616374697665223a747275657d2c7b226673223a224557222c2269617461223a224557222c226963616f223a22455747222c226e616d65223a224575726f77696e6773222c22616374697665223a747275657d5d2c22616972706f727473223a5b7b226673223a2243474e222c2269617461223a2243474e222c226963616f223a224544444b222c226e616d65223a22436f6c6f676e6520426f6e6e20416972706f7274222c2263697479223a22436f6c6f676e65222c2263697479436f6465223a2243474e222c22636f756e747279436f6465223a224445222c22636f756e7472794e616d65223a224765726d616e79222c22726567696f6e4e616d65223a224575726f7065222c2274696d655a6f6e65526567696f6e4e616d65223a224575726f70652f4265726c696e222c226c6f63616c54696d65223a22323031382d30352d31345432303a31313a31312e393139222c227574634f6666736574486f757273223a322e302c226c61746974756465223a35302e3837383336332c226c6f6e676974756465223a372e3132323232342c22656c65766174696f6e46656574223a3235302c22636c617373696669636174696f6e223a322c22616374697665223a747275652c2264656c6179496e64657855726c223a2268747470733a2f2f6170692e666c6967687473746174732e636f6d2f666c65782f64656c6179696e6465782f726573742f76312f6a736f6e2f616972706f7274732f43474e3f636f6465547970653d6673222c227765617468657255726c223a2268747470733a2f2f6170692e666c6967687473746174732e636f6d2f666c65782f776561746865722f726573742f76312f6a736f6e2f616c6c2f43474e3f636f6465547970653d6673227d2c7b226673223a224c4852222c2269617461223a224c4852222c226963616f223a2245474c4c222c226e616d65223a224c6f6e646f6e204865617468726f7720416972706f7274222c2263697479223a224c6f6e646f6e222c2263697479436f6465223a224c4f4e222c227374617465436f6465223a22454e222c22636f756e747279436f6465223a224742222c22636f756e7472794e616d65223a22556e69746564204b696e67646f6d222c22726567696f6e4e616d65223a224575726f7065222c2274696d655a6f6e65526567696f6e4e616d65223a224575726f70652f4c6f6e646f6e222c226c6f63616c54696d65223a22323031382d30352d31345431393a31313a31312e393139222c227574634f6666736574486f757273223a312e302c226c61746974756465223a35312e3436393630332c226c6f6e676974756465223a2d302e3435333536362c22656c65766174696f6e46656574223a38302c22636c617373696669636174696f6e223a312c22616374697665223a747275652c2264656c6179496e64657855726c223a2268747470733a2f2f6170692e666c6967687473746174732e636f6d2f666c65782f64656c6179696e6465782f726573742f76312f6a736f6e2f616972706f7274732f4c48523f636f6465547970653d6673222c227765617468657255726c223a2268747470733a2f2f6170692e666c6967687473746174732e636f6d2f666c65782f776561746865722f726573742f76312f6a736f6e2f616c6c2f4c48523f636f6465547970653d6673227d5d2c2265717569706d656e7473223a5b7b2269617461223a22333230222c226e616d65223a224169726275732041333230222c22747572626f50726f70223a66616c73652c226a6574223a747275652c2277696465626f6479223a66616c73652c22726567696f6e616c223a66616c73657d5d7d2c22666c69676874537461747573223a7b22666c696768744964223a3935393032323437322c22636172726965724673436f6465223a223455222c22666c696768744e756d626572223a22343639222c22646570617274757265416972706f72744673436f6465223a224c4852222c226172726976616c416972706f72744673436f6465223a2243474e222c2264657061727475726544617465223a7b22646174654c6f63616c223a22323031382d30352d31335432303a30303a30302e303030222c2264617465557463223a22323031382d30352d31335431393a30303a30302e3030305a227d2c226172726976616c44617465223a7b22646174654c6f63616c223a22323031382d30352d31335432323a32353a30302e303030222c2264617465557463223a22323031382d30352d31335432303a32353a30302e3030305a227d2c22737461747573223a2243222c227363686564756c65223a7b22666c6967687454797065223a224a222c2273657276696365436c6173736573223a2252464a59222c227265737472696374696f6e73223a22227d2c226f7065726174696f6e616c54696d6573223a7b227075626c6973686564446570617274757265223a7b22646174654c6f63616c223a22323031382d30352d31335432303a30303a30302e303030222c2264617465557463223a22323031382d30352d31335431393a30303a30302e3030305a227d2c227075626c69736865644172726976616c223a7b22646174654c6f63616c223a22323031382d30352d31335432323a32353a30302e303030222c2264617465557463223a22323031382d30352d31335432303a32353a30302e3030305a227d2c227363686564756c656447617465446570617274757265223a7b22646174654c6f63616c223a22323031382d30352d31335432303a30303a30302e303030222c2264617465557463223a22323031382d30352d31335431393a30303a30302e3030305a227d2c22657374696d6174656447617465446570617274757265223a7b22646174654c6f63616c223a22323031382d30352d31335432303a33353a30302e303030222c2264617465557463223a22323031382d30352d31335431393a33353a30302e3030305a227d2c227363686564756c6564476174654172726976616c223a7b22646174654c6f63616c223a22323031382d30352d31335432323a32353a30302e303030222c2264617465557463223a22323031382d30352d31335432303a32353a30302e3030305a227d2c22657374696d61746564476174654172726976616c223a7b22646174654c6f63616c223a22323031382d30352d31335432323a35343a30302e303030222c2264617465557463223a22323031382d30352d31335432303a35343a30302e3030305a227d7d2c22636f6465736861726573223a5b7b226673436f6465223a225541222c22666c696768744e756d626572223a2239363731222c2272656c6174696f6e73686970223a224c227d2c7b226673436f6465223a224557222c22666c696768744e756d626572223a22343639222c2272656c6174696f6e73686970223a2253227d5d2c2264656c617973223a7b226465706172747572654761746544656c61794d696e75746573223a33352c226172726976616c4761746544656c61794d696e75746573223a32397d2c22666c696768744475726174696f6e73223a7b227363686564756c6564426c6f636b4d696e75746573223a38357d2c22616972706f72745265736f7572636573223a7b226465706172747572655465726d696e616c223a2232222c226172726976616c5465726d696e616c223a2231222c226172726976616c47617465223a22423430227d2c22666c6967687445717569706d656e74223a7b227363686564756c656445717569706d656e7449617461436f6465223a22333230222c2261637475616c45717569706d656e7449617461436f6465223a22333230227d7d7d002943beee6c730a1c318a943bb98ede"
	console.log((await flightProof), totalCoverAmount, premiumAmount)
	this.insuranceContractInst.proposeInsuranceCover(flightProof, totalCoverAmount, {from: this.currAccount, value: premiumAmount});
    }

    // Function to remove an insurance from the blockchain
    async removeInsurance(insurance) {
	console.log("removing insurance " + insurance.id);
	this.insuranceContractInst.cancelInsuranceContract(insurance.id, {from:this.currAccount});
    }

    // Function to invest in an insurance
    async investInsurance(insurance, amount) {
	console.log("paying into insurance " + amount)
	this.insuranceContractInst.acceptContract(insurance.id, {from:this.currAccount, value: this.state.web3.toWei(amount, "ether")})
    }

    // Function to claim an unclaimed insurance
    async claimInsurance(insurance) {
	console.log("claiming insurance " + insurance.id)
	this.insuranceContractInst.resolveContract(insurance.id, flights.getFlight(insurance.flightID)["proof"])
    }


    render() {
	// Returns a component class for a button with label text and callback function f called with props.insurance
	var buttonComponentFactory = function(f,text) {
	    var buttonComponent = class extends Component {
		constructor(props) {
		    super(props)
		}
		render() {
		     return(<button onClick={() => f(this.props.insurance) }>{text}</button>)
		}
	    }
	    return buttonComponent
	}
	// Build a button class for cancelling and one for claiming
	var cancelButtonClass = buttonComponentFactory(this.removeInsurance.bind(this), "Cancel")
	var claimButtonClass = buttonComponentFactory(this.claimInsurance.bind(this), "Claim Payout")
	var app = this
	// Build a component for investing which uses this.props.insurance
	var investComponent = class extends Component {
	    constructor(props) {
		super(props)
		this.state = {investement:0}
	    }
	    setInvestement(value) {
		var notNum = isNaN(value)
		if (!notNum) {
		    this.setState({investement:value})
		}
	    }
	    render() {
		var contributions = 0
		for (var i = 0; i < this.props.insurance.contributors.length; i++) {
		    if (this.props.insurance.contributors[i] === app.currAccount) {
			contributions += parseFloat(this.props.insurance.contributions[i])
		    }
		}
		return(
			<div style={{display:"inline-block"}}>
		    	<button onClick={() => {app.investInsurance(this.props.insurance, this.state.investement)}}>Invest {this.state.investement} ether</button>
			<input style={{width:"65px"}} placeholder="Stake" onChange={(e) => {this.setInvestement(e.target.value)}}></input>
			{(contributions > 0) ? "(Already invested " + contributions + " ether)" : null}
		    </div>
		)
	    }
	}

	return (
		<div className="App">
		<div class="container">


			<Navbar fluid inverse bsStyle="inverse" scrolling>
			  <Navbar.Header>
			    <Navbar.Brand>
			      <a href="/"><Icon size={20} icon={ic_flight_takeoff} /></a>
			    </Navbar.Brand>
			  </Navbar.Header>
			  <Nav>
			    <NavItem eventKey={1} href="/about">
			      Documentation
			    </NavItem>

			    <NavDropdown eventKey={2} title="Insurance Menu" id="basic-nav-dropdown">
			      <MenuItem eventKey={2.1} href="/create_insurance"> Create Insurance </MenuItem>
			      <MenuItem eventKey={2.2} href="/my_insurances"> My Insurances </MenuItem>
			      <MenuItem eventKey={2.3} href="/unfunded_insurances"> My Unfunded Insurances </MenuItem>
		              <MenuItem eventKey={2.4} href="/invest"> Invest </MenuItem>
		              <MenuItem eventKey={2.5} href="/investements"> Investements </MenuItem>
		              <MenuItem divider />
			      <MenuItem eventKey={2.5} href="/support">Support</MenuItem>
			    </NavDropdown>
			  </Nav>
			</Navbar>




		<div>
			<Switch>
				<Route exact path ="/" render = {()=>
					<div>
						<Jumbotron>
							<h1>Are you ready for a new trip?</h1>
		       			    <p><strong>FlightDApp. Your personal flight insurance generator.</strong></p>
		        			<Button bsStyle="info" bsSize="large" href="/about" >Learn more </Button>
						</Jumbotron>
						<Well>Welcome to decentralised Flight Insurance DApp. On this website you can create an insurance request, observe the status of your past requests and make an investement. Please select desired option in the dropdown Menu on top.</Well>
					</div>
				}/>

				<Route path="/create_insurance" render ={()=>
					<div>
						<InsurancePolicyCreator addInsurance={this.addNewInsurance.bind(this)} />
					</div>
				}/>

				<Route path="/about" render = { ()=>
				   <div>
				   <Well>
				    <h2>More Information on FlightDApp</h2>
				    <p>This is a unique DApp which helps you to obtain a flight insurance ! </p>
				    <p>Smart contracts written on the blockchain cannot fetch real world data and must rely on trusted, third-party oracles to request it from the desired source. Currently, these oracles must be trusted to feed the data unedited to the blockchain for use by the requesting contract.</p>
				    <p>Having the ability to independently verify information would remove the need for trust in third parties while guaranteeing the validity of the data received over the internet. As a result, it would be possible to automatically feed this information into the blockchain ecosystem and execute contracts on the basis of it. TLS-N, an extension to the existing secure web protocol TLS, achieves this goal.</p>
					<p>It provides a secure, non-repudiable and trivially verifiable proof about the contents (message, time-stamped) of a TLS session, and that the contents have not been tampered with. As a result, users no longer need to trust that oracles or intermediaries have not tampered with data, and can automate the execution of their contracts based on the TLS-N verification.</p>
				   </Well>
				  </div>

				}/>

				<Route path="/my_insurances">
					<InsurancePolicyList header={"Your Insurances"} actionComponent={claimButtonClass} insurances={this.state.userFilledInsurances}></InsurancePolicyList>
				</Route>

				<Route path="/unfunded_insurances">
					<InsurancePolicyList header={"My Unfunded Insurances"} actionComponent={cancelButtonClass} insurances={this.state.userUnfilledInsurances}></InsurancePolicyList>
				</Route>

				<Route path="/invest">
					<InsurancePolicyList header={"Invest in Insurance"} actionComponent={investComponent} insurances={this.state.availableInsurances}></InsurancePolicyList>
				</Route>

        <Route path="/investements">
          <InsurancePolicyList header={"Your Investements in Insurance"} actionComponent={investComponent} insurances={this.state.availableInsurances}></InsurancePolicyList>
        </Route>

        <Route path="">

        </Route>

				<Route path="/support" render = { ()=>
					<div>
						<Jumbotron>
						<h1>Difficulties?</h1>
						<p> <strong> Please contact us on the following e-mail for any questions or suggestions: </strong></p>
						<p> <strong> nijat.bakhshaliyev17@imperial.ac.uk </strong></p>
						</Jumbotron>
					</div>
				}/>
    		</Switch>
		</div>


		</div>
		</div>
	);
    }
}

export default App

// <InsurancePolicyList header={"Insurance You Have Invested In"} actionComponent={claimButtonClass} insurances={this.state.investedInsurance}></InsurancePolicyList>


/*
In order:
- need proper proof
- claim insurance not working
- Need button for claiming insurance premium and repayement or whatevr
- Make sure the flight from flight.flightStatuses[] is correct
Plan:
- Improve the creator
- Improve bet descr (and Styling)
- General styling
- Need list for insurances you have invested in that are filled
- If nothing is in the list, then display some message
*/
