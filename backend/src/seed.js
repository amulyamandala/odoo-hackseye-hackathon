require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./models');

const seedDatabase = async () => {
  try {
    console.log('Connecting to database...');
    await db.sequelize.authenticate();
    
    await db.sequelize.sync();
    console.log('Database synced. Checking for existing roles...');
    
    // 1. Create Roles
    const [adminRole] = await db.Role.findOrCreate({ where: { name: 'Admin' } });
    await db.Role.findOrCreate({ where: { name: 'Manager' } });
    await db.Role.findOrCreate({ where: { name: 'Employee' } });
    console.log('Roles seeded.');

    // 2. Create Default Department
    const [itDept] = await db.Department.findOrCreate({ 
      where: { name: 'IT Department' },
      defaults: { description: 'Information Technology' }
    });
    console.log('Department seeded.');

    // 3. Create Default Admin User
    const adminEmail = 'admin@odoo.com';
    const existingAdmin = await db.Employee.findOne({ where: { email: adminEmail } });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.Employee.create({
        firstName: 'System',
        lastName: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        departmentId: itDept.id,
        roleId: adminRole.id
      });
      console.log('Default Admin user created successfully: admin@odoo.com / admin123');
    } else {
      console.log('Admin user already exists. Skipping.');
    }

    // 3.1 Create odoo@admin.com Admin User
    const odooEmail = 'odoo@admin.com';
    const existingOdooAdmin = await db.Employee.findOne({ where: { email: odooEmail } });
    
    if (!existingOdooAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.Employee.create({
        firstName: 'Odoo',
        lastName: 'Admin',
        email: odooEmail,
        password: hashedPassword,
        departmentId: itDept.id,
        roleId: adminRole.id
      });
      console.log('Odoo Admin user created successfully: odoo@admin.com / admin123');
    }

    // 3.5 Create User Varun
    const varunEmail = 'varun@odoo.com';
    const existingVarun = await db.Employee.findOne({ where: { email: varunEmail } });
    
    if (!existingVarun) {
      const hashedPassword = await bcrypt.hash('Kabc@123', 10);
      await db.Employee.create({
        firstName: 'Varun',
        lastName: 'Admin',
        email: varunEmail,
        password: hashedPassword,
        departmentId: itDept.id,
        roleId: adminRole.id
      });
      console.log('User Varun created successfully: varun@odoo.com / Kabc@123');
    }
    
    // 4. Create some basic Asset Categories
    await db.AssetCategory.findOrCreate({ where: { name: 'Laptops' } });
    await db.AssetCategory.findOrCreate({ where: { name: 'Monitors' } });
    await db.AssetCategory.findOrCreate({ where: { name: 'Peripherals' } });
    console.log('Asset Categories seeded.');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
