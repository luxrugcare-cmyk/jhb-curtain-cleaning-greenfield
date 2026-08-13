# Attio mapping — verified workspace state

Verified 2026-08-13 through the connected workspace.

Available standard objects inspected: `people`, `companies`. The connected workspace does not currently expose a Deals object. Existing list: `Customer Success` (`customer_success`), parent object Companies.

Verified People fields include `name`, `email_addresses`, `phone_numbers`, `description`, `company`, `primary_location`. Verified Company fields include `name`, `domains`, `description`, `primary_location`.

The v0.3 application therefore does not hard-code a Deals object or mutate the existing Customer Success list. Commercial pipeline structure remains behind an adapter/approval gate.
