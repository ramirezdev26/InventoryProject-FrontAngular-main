import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { InventoryService } from './inventory.service';
import { AuthService } from '../auth-service/auth.service';
import { Product} from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { Supplier } from 'src/app/models/supplier.model';
import { Invoice } from 'src/app/models/invoice.model';
import { Branch } from 'src/app/models/branch.model';
import emailjs from '@emailjs/browser'


describe('InventoryService', () => {
  let service: InventoryService;
  let authService: AuthService;
  let httpMock: HttpTestingController;

  const jwtHelperServiceMock = {
    decodeToken: () => {},
    getTokenExpirationDate: () => {},
    isTokenExpired: () => {},
  };

  const emailjsMock = {
    init: () => {},
    send: () => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InventoryService, 
        AuthService,     
        { provide: JwtHelperService, useValue: jwtHelperServiceMock },
        { provide: emailjs, useValue: emailjsMock },
      ],
    });
    service = TestBed.inject(InventoryService);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get current branch id', () => {
    const branchId = '123';
    service.setCurrentBranchId(branchId);

    expect(service.getCurrentBranchId()).toBe(branchId);
  });

  it('should set and get current role', () => {
    const role = 'admin';
    service.setCurrentRol(role);

    expect(service.getCurrentRol()).toBe(role);
  });

  it('should retrieve branches', () => {
  const expectedBranches: Branch[] = [
    { id: '1', name: 'Branch 1', country: 'Country 1', city: 'City 1' },
    ];

    service.getAllBranches().subscribe((branches: Branch[]) => {
        expect(branches).toEqual(expectedBranches);
    });

    const req = httpMock.expectOne(`${service.api}/branches`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedBranches);
  });

  

  it('should post a new branch', () => {
    const newBranch: Branch = {
      id: '2',
      name: 'New Branch',
      country: 'New Country',
      city: 'New City',
    };

    service.postNewBranch(newBranch).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.commandApi}/branches`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });


  it('should get products by branch', () => {
    const branchId = 'testBranchId';
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        inventoryStock: 10,
        price: 50,
        category: 'Category A',
        branchId: branchId,
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description 2',
        inventoryStock: 15,
        price: 75,
        category: 'Category B',
        branchId: branchId,
      },
    ];

    service.getProductsByBranch(branchId).subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${service.api}/products/${branchId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should get users by branch', () => {
    const branchId = 'testBranchId';
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'User 1',
        last_name: 'Last Name 1',
        email: 'user1@example.com',
        role: 'Role A',
        branchId: branchId,
      },
      {
        id: '2',
        name: 'User 2',
        last_name: 'Last Name 2',
        email: 'user2@example.com',
        role: 'Role B',
        branchId: branchId,
      },
    ];
  
    service.getUsersByBranch(branchId).subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });
  
    const req = httpMock.expectOne(`${service.api}/users/${branchId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
  
  it('should get suppliers by branch', () => {
    const branchId = 'testBranchId';
    const mockSuppliers: Supplier[] = [
      {
        id: '1',
        branchId: branchId,
        name: 'Supplier 1',
        number: 12345,
        email: 'supplier1@example.com',
        payment_term: 'Net 30',
      },
      {
        id: '2',
        branchId: branchId,
        name: 'Supplier 2',
        number: 67890,
        email: 'supplier2@example.com',
        payment_term: 'Net 45',
      },
    ];
  
    service.getSuppliersByBranch(branchId).subscribe((suppliers) => {
      expect(suppliers).toEqual(mockSuppliers);
    });
  
    const req = httpMock.expectOne(`${service.api}/suppliers/${branchId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSuppliers);
  });
  
  it('should get invoices by branch', () => {
    const branchId = 'testBranchId';
    const mockInvoices: Invoice[] = [
      {
        id: '1',
        products: [
        ],
        total: 100,
        date: new Date(),
        invoiceType: 'sale',
        branchId: branchId,
      },
    ];
  
    service.getInvoicesByBranch(branchId).subscribe((invoices) => {
      expect(invoices).toEqual(mockInvoices);
    });
  
    const req = httpMock.expectOne(`${service.api}/invoices/${branchId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockInvoices);
  });

  it('should post a new product', () => {
    const newProduct: Product = {
      id: '1',
      name: 'New Product',
      description: 'Product Description',
      inventoryStock: 100,
      price: 50.0,
      category: 'Category A',
      branchId: 'testBranchId',
    };

    service.postNewProduct(newProduct).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.commandApi}/product`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should post a new user', () => {
    const newUser: User = {
      id: '1',
      name: 'New User',
      last_name: 'Last Name',
      email: 'newuser@example.com',
      role: 'Role A',
      branchId: 'testBranchId',
    };

    service.postNewUser(newUser).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.commandApi}/user`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should post a new supplier', () => {
    const newSupplier: Supplier = {
      id: '1',
      branchId: 'testBranchId',
      name: 'New Supplier',
      number: 12345,
      email: 'newsupplier@example.com',
      payment_term: 'Net 30',
    };

    service.postNewSupplier(newSupplier).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.commandApi}/supplier`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should patch final customer sale', () => {
    const saleInfo = {
      products: [
        { productId: '1', quantity: 5 },
        { productId: '2', quantity: 3 },
      ],
      branchId: 'testBranchId',
    };

    service.patchFinalCustomerSale(saleInfo).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.commandApi}/product/customer-sale`);
    expect(req.request.method).toBe('PATCH');
    req.flush({});
  });

  it('should patch reseller sale', () => {
    const saleInfo = {
      products: [
        { productId: '3', quantity: 10 },
        { productId: '4', quantity: 7 },
      ],
      branchId: 'testBranchId',
    };

    service.patchResellerSale(saleInfo).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.commandApi}/product/reseller-sale`);
    expect(req.request.method).toBe('PATCH');
    req.flush({});
  });

  it('should patch add stock to product', () => {
    const addStockInfo = {
      products: [
        { productId: '5', quantity: 20 },
        { productId: '6', quantity: 15 },
      ],
      branchId: 'testBranchId',
    };

    service.patchAddStockToProduct(addStockInfo).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.commandApi}/product/purchase`);
    expect(req.request.method).toBe('PATCH');
    req.flush({});
  });

  it('should patch change user role', () => {
    const userInfo = {
      userId: '7',
      role: 'admin',
      branchId: 'testBranchId',
    };

    service.patchChangeUserRole(userInfo).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.commandApi}/user/role`);
    expect(req.request.method).toBe('PATCH');
    req.flush({});
  });
  
   it('should send an email', () => {
    const emailSpy = spyOn(emailjsMock, 'send');

    const email = 'test@example.com';
    const supplier = {
      id: '1',
      branchId: 'branch1',
      name: 'Supplier 1',
      number: 123456789,
      email: 'supplier@example.com',
      payment_term: 'NET30',
    };

    service.sendEmail(email, supplier);

    
  });


  afterEach(() => {
    httpMock.verify();
  });
});
