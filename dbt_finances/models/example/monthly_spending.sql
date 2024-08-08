SELECT 
TO_CHAR( "authorized_date", 'Month' ) as month_name,
SUM(amount)
FROM {{ ref("transactions") }}
GROUP BY TO_CHAR("authorized_date", 'Month')