-- Ghost Factory™ Production Schema for COLD CHAIN STORAGE OS
-- PostgreSQL 15+ Compatible with Row Level Security (RLS)

-- 1. Main Fleet / Asset Inventory Table
CREATE TABLE IF NOT EXISTS cold_storage_zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_tag VARCHAR(50) UNIQUE NOT NULL,
    model_name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    daily_rate_cents INTEGER NOT NULL,
    operational_status VARCHAR(50) DEFAULT 'AVAILABLE',
    telematics_runtime_hours NUMERIC(10,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Dispatch / Booking Records Table
CREATE TABLE IF NOT EXISTS dock_appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID REFERENCES cold_storage_zones(id) ON DELETE SET NULL,
    client_name VARCHAR(150) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    dispatch_date DATE NOT NULL,
    return_date DATE,
    contract_status VARCHAR(50) DEFAULT 'ACTIVE',
    security_deposit_cents INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Telemetry / Quality Inspections Table
CREATE TABLE IF NOT EXISTS temperature_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID REFERENCES cold_storage_zones(id) ON DELETE CASCADE,
    inspector_id VARCHAR(100) NOT NULL,
    inspection_notes TEXT,
    compliance_passed BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Audit & Delivery Dispatches Table
CREATE TABLE IF NOT EXISTS pallet_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dispatch_code VARCHAR(100) UNIQUE NOT NULL,
    destination_site TEXT NOT NULL,
    carrier_license VARCHAR(100),
    bill_of_lading_hash VARCHAR(255),
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE cold_storage_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE dock_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE temperature_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE pallet_reservations ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Public Read Access" ON cold_storage_zones FOR SELECT USING (true);
CREATE POLICY "Public Insert Access" ON dock_appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin All Access Fleet" ON cold_storage_zones FOR ALL USING (true);
CREATE POLICY "Admin All Access Contracts" ON dock_appointments FOR ALL USING (true);
CREATE POLICY "Admin All Access Inspections" ON temperature_logs FOR ALL USING (true);
CREATE POLICY "Admin All Access Dispatches" ON pallet_reservations FOR ALL USING (true);
